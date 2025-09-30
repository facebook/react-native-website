import React, { useState, useEffect } from 'react';
import { Sparkles, Wand2, Crown, Users, Bot, Flame, Zap, Skull } from 'lucide-react';

const HarryPotterCheckers = () => {
  const [board, setBoard] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('gryffindor');
  const [validMoves, setValidMoves] = useState([]);
  const [score, setScore] = useState({ gryffindor: 12, slytherin: 12 });
  const [mustCapture, setMustCapture] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [attackAnimation, setAttackAnimation] = useState(null);

  useEffect(() => {
    if (gameMode) {
      initializeBoard();
    }
  }, [gameMode]);

  useEffect(() => {
    if (gameMode === 'cpu' && currentPlayer === 'slytherin' && !winner) {
      setIsThinking(true);
      const timer = setTimeout(() => {
        makeCPUMove();
        setIsThinking(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, board, gameMode, winner]);

  const initializeBoard = () => {
    const newBoard = Array(8).fill(null).map(() => Array(8).fill(null));
    
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 1) {
          newBoard[row][col] = { player: 'slytherin', isKing: false };
        }
      }
    }
    
    for (let row = 5; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 1) {
          newBoard[row][col] = { player: 'gryffindor', isKing: false };
        }
      }
    }
    
    setBoard(newBoard);
    setCurrentPlayer('gryffindor');
    setScore({ gryffindor: 12, slytherin: 12 });
    setWinner(null);
    setSelectedPiece(null);
    setValidMoves([]);
    setMustCapture(false);
  };

  const getValidMoves = (row, col, piece, boardState = board, checkCaptureOnly = false) => {
    const moves = [];
    const captures = [];
    const directions = piece.isKing 
      ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
      : piece.player === 'gryffindor' 
        ? [[-1, -1], [-1, 1]]
        : [[1, -1], [1, 1]];

    directions.forEach(([dRow, dCol]) => {
      const newRow = row + dRow;
      const newCol = col + dCol;

      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (!boardState[newRow][newCol] && !checkCaptureOnly) {
          moves.push({ row: newRow, col: newCol, isCapture: false });
        } else if (boardState[newRow][newCol] && boardState[newRow][newCol].player !== piece.player) {
          const jumpRow = newRow + dRow;
          const jumpCol = newCol + dCol;
          
          if (jumpRow >= 0 && jumpRow < 8 && jumpCol >= 0 && jumpCol < 8 && !boardState[jumpRow][jumpCol]) {
            captures.push({ 
              row: jumpRow, 
              col: jumpCol, 
              capturedRow: newRow, 
              capturedCol: newCol,
              isCapture: true 
            });
          }
        }
      }
    });

    return captures.length > 0 ? captures : moves;
  };

  const checkForCaptures = (player, boardState = board) => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = boardState[row][col];
        if (piece && piece.player === player) {
          const moves = getValidMoves(row, col, piece, boardState, true);
          if (moves.length > 0) return true;
        }
      }
    }
    return false;
  };

  const getAllPossibleMoves = (player, boardState = board) => {
    const allMoves = [];
    const hasCaptures = checkForCaptures(player, boardState);
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = boardState[row][col];
        if (piece && piece.player === player) {
          const moves = getValidMoves(row, col, piece, boardState, hasCaptures);
          moves.forEach(move => {
            allMoves.push({ fromRow: row, fromCol: col, ...move });
          });
        }
      }
    }
    return allMoves;
  };

  const makeCPUMove = () => {
    const possibleMoves = getAllPossibleMoves('slytherin');
    
    if (possibleMoves.length === 0) return;

    const captures = possibleMoves.filter(m => m.isCapture);
    const movesToConsider = captures.length > 0 ? captures : possibleMoves;
    
    const randomMove = movesToConsider[Math.floor(Math.random() * movesToConsider.length)];
    
    executeMove(randomMove.fromRow, randomMove.fromCol, randomMove.row, randomMove.col, randomMove);
  };

  const executeMove = (fromRow, fromCol, toRow, toCol, moveData) => {
    const newBoard = board.map(r => [...r]);
    const movingPiece = newBoard[fromRow][fromCol];
    
    if (moveData.isCapture) {
      setAttackAnimation({ row: moveData.capturedRow, col: moveData.capturedCol });
      setTimeout(() => setAttackAnimation(null), 600);
    }
    
    newBoard[toRow][toCol] = movingPiece;
    newBoard[fromRow][fromCol] = null;

    if (moveData.isCapture) {
      setTimeout(() => {
        const boardAfterCapture = newBoard.map(r => [...r]);
        boardAfterCapture[moveData.capturedRow][moveData.capturedCol] = null;
        setBoard(boardAfterCapture);
        
        const newScore = { ...score };
        newScore[currentPlayer === 'gryffindor' ? 'slytherin' : 'gryffindor']--;
        setScore(newScore);
        
        if (newScore.gryffindor === 0) {
          setWinner('slytherin');
        } else if (newScore.slytherin === 0) {
          setWinner('gryffindor');
        }
      }, 400);
    } else {
      setBoard(newBoard);
    }

    if ((toRow === 0 && movingPiece.player === 'gryffindor') || 
        (toRow === 7 && movingPiece.player === 'slytherin')) {
      setTimeout(() => {
        const boardWithKing = board.map(r => [...r]);
        if (boardWithKing[toRow][toCol]) {
          boardWithKing[toRow][toCol].isKing = true;
          setBoard(boardWithKing);
        }
      }, 100);
    }

    setTimeout(() => {
      const nextPlayer = currentPlayer === 'gryffindor' ? 'slytherin' : 'gryffindor';
      const hasCaptures = checkForCaptures(nextPlayer, newBoard);
      setMustCapture(hasCaptures);
      setCurrentPlayer(nextPlayer);
    }, moveData.isCapture ? 500 : 100);
  };

  const handleSquareClick = (row, col) => {
    if (winner || (gameMode === 'cpu' && currentPlayer === 'slytherin') || attackAnimation) return;

    const piece = board[row][col];

    if (selectedPiece) {
      const validMove = validMoves.find(m => m.row === row && m.col === col);
      
      if (validMove) {
        executeMove(selectedPiece.row, selectedPiece.col, row, col, validMove);
        setSelectedPiece(null);
        setValidMoves([]);
      } else {
        setSelectedPiece(null);
        setValidMoves([]);
      }
    } else if (piece && piece.player === currentPlayer) {
      const moves = getValidMoves(row, col, piece, board, mustCapture);
      
      if (moves.length > 0) {
        setSelectedPiece({ row, col });
        setValidMoves(moves);
      }
    }
  };

  const resetGame = () => {
    if (gameMode) {
      initializeBoard();
    }
  };

  const startGame = (mode) => {
    setGameMode(mode);
  };

  if (!gameMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-stone-900 flex items-center justify-center p-2 sm:p-4">
        <div className="max-w-md w-full px-2">
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-3xl sm:text-6xl font-bold text-stone-200 mb-2 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <Wand2 className="w-6 h-6 sm:w-12 sm:h-12 text-amber-400" />
              <span className="leading-tight">Xadrez de Bruxo</span>
              <Flame className="w-6 h-6 sm:w-12 sm:h-12 text-red-500" />
            </h1>
            <p className="text-stone-400 text-sm sm:text-lg italic">Inspirado em Harry Potter</p>
          </div>

          <div className="bg-gradient-to-br from-stone-900/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-4 sm:p-8 shadow-2xl border-2 sm:border-4 border-stone-700">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-300 text-center mb-4 sm:mb-6">Escolha o Modo de Jogo</h2>
            
            <button
              onClick={() => startGame('cpu')}
              className="w-full mb-3 sm:mb-4 p-4 sm:p-6 bg-gradient-to-r from-red-800 to-red-900 active:from-red-700 active:to-red-800 text-stone-100 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-xl border-2 border-red-700 touch-manipulation"
            >
              <Bot className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              <span>Desafiar o Bruxo das Trevas</span>
            </button>

            <button
              onClick={() => startGame('pvp')}
              className="w-full p-4 sm:p-6 bg-gradient-to-r from-amber-800 to-amber-900 active:from-amber-700 active:to-amber-800 text-stone-100 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-xl border-2 border-amber-700 touch-manipulation"
            >
              <Users className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              <span>Duelo entre Bruxos</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-stone-900 flex items-center justify-center p-2 sm:p-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-3 sm:mb-6">
          <h1 className="text-2xl sm:text-5xl font-bold text-stone-200 mb-1 sm:mb-2 flex items-center justify-center gap-2 sm:gap-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <Wand2 className="w-5 h-5 sm:w-10 sm:h-10 text-amber-400" />
            <span className="leading-tight">Xadrez de Bruxo</span>
            <Flame className="w-5 h-5 sm:w-10 sm:h-10 text-red-500" />
          </h1>
          <p className="text-stone-400 text-xs sm:text-lg italic">
            {gameMode === 'cpu' ? 'Você vs Bruxo das Trevas' : 'Duelo de Bruxos'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-stone-900/90 to-slate-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-6 shadow-2xl border-2 sm:border-4 border-stone-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 mb-3 sm:mb-6">
            <div className={`w-full sm:w-auto flex items-center gap-2 sm:gap-3 p-2 sm:p-4 rounded-lg border-2 ${currentPlayer === 'gryffindor' ? 'bg-red-950/70 border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]' : 'bg-red-950/30 border-red-900'}`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-700 to-red-900 rounded-lg border-2 border-red-500 flex items-center justify-center shadow-lg flex-shrink-0">
                <Flame className="w-4 h-4 sm:w-6 sm:h-6 text-orange-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-red-300 font-bold text-sm sm:text-lg truncate">
                  Grifinória {gameMode === 'cpu' && '(Você)'}
                </div>
                <div className="text-red-400 text-xs sm:text-sm">{score.gryffindor} guerreiros</div>
              </div>
            </div>

            <button
              onClick={() => setGameMode(null)}
              className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 bg-stone-700 active:bg-stone-600 text-stone-200 font-bold rounded-lg transition-colors shadow-lg border-2 border-stone-600 text-sm sm:text-base touch-manipulation"
            >
              Sair
            </button>

            <div className={`w-full sm:w-auto flex items-center gap-2 sm:gap-3 p-2 sm:p-4 rounded-lg border-2 ${currentPlayer === 'slytherin' ? 'bg-green-950/70 border-green-600 shadow-[0_0_20px_rgba(22,163,74,0.5)]' : 'bg-green-950/30 border-green-900'}`}>
              <div className="flex-1 min-w-0 sm:order-2">
                <div className="text-green-300 font-bold text-sm sm:text-lg text-left sm:text-right truncate">
                  Sonserina {gameMode === 'cpu' && '(CPU)'}
                </div>
                <div className="text-green-400 text-xs sm:text-sm text-left sm:text-right">{score.slytherin} guerreiros</div>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-700 to-green-900 rounded-lg border-2 border-green-500 flex items-center justify-center shadow-lg flex-shrink-0 sm:order-1">
                {gameMode === 'cpu' ? (
                  <Skull className="w-4 h-4 sm:w-6 sm:h-6 text-green-300" />
                ) : (
                  <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-green-300" />
                )}
              </div>
            </div>
          </div>

          {isThinking && (
            <div className="mb-2 sm:mb-4 p-2 sm:p-4 bg-green-950/70 border-2 border-green-600 rounded-lg text-center shadow-[0_0_20px_rgba(22,163,74,0.3)]">
              <p className="text-green-300 font-bold animate-pulse flex items-center justify-center gap-2 text-xs sm:text-base">
                <Skull className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">O Bruxo das Trevas está conjurando...</span>
                <span className="sm:hidden">Conjurando...</span>
                <Skull className="w-4 h-4 sm:w-5 sm:h-5" />
              </p>
            </div>
          )}

          <div className="bg-stone-950/80 p-2 sm:p-6 rounded-xl shadow-2xl border-2 sm:border-4 border-stone-800">
            <div className="grid grid-cols-8 gap-0 shadow-2xl border-2 sm:border-4 border-stone-700">
              {board.map((row, rowIndex) => (
                row.map((piece, colIndex) => {
                  const isBlackSquare = (rowIndex + colIndex) % 2 === 1;
                  const isSelected = selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex;
                  const isValidMove = validMoves.some(m => m.row === rowIndex && m.col === colIndex);
                  const isAttacked = attackAnimation && attackAnimation.row === rowIndex && attackAnimation.col === colIndex;
                  
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleSquareClick(rowIndex, colIndex)}
                      className={`aspect-square flex items-center justify-center cursor-pointer transition-all relative touch-manipulation
                        ${isBlackSquare ? 'bg-gradient-to-br from-stone-700 to-stone-800' : 'bg-gradient-to-br from-stone-400 to-stone-500'}
                        ${isSelected ? 'ring-2 sm:ring-4 ring-yellow-500 ring-inset shadow-[inset_0_0_20px_rgba(234,179,8,0.5)]' : ''}
                        ${isValidMove ? 'ring-2 sm:ring-4 ring-green-500 ring-inset animate-pulse shadow-[inset_0_0_20px_rgba(34,197,94,0.5)]' : ''}
                        ${isAttacked ? 'animate-pulse bg-red-600' : ''}
                        active:brightness-110
                      `}
                    >
                      {isAttacked && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <Zap className="w-6 h-6 sm:w-12 sm:h-12 text-yellow-300 animate-ping" />
                        </div>
                      )}
                      {piece && (
                        <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-md sm:rounded-lg flex items-center justify-center shadow-2xl transition-transform active:scale-110 border sm:border-2
                          ${piece.player === 'gryffindor' 
                            ? 'bg-gradient-to-br from-red-700 via-red-800 to-red-900 border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.6)] sm:shadow-[0_0_15px_rgba(220,38,38,0.6)]' 
                            : 'bg-gradient-to-br from-green-700 via-green-800 to-green-900 border-green-500 shadow-[0_0_10px_rgba(22,163,74,0.6)] sm:shadow-[0_0_15px_rgba(22,163,74,0.6)]'
                          }
                          ${isAttacked ? 'scale-75 opacity-50' : ''}
                        `}
                        >
                          {piece.isKing ? (
                            <Crown className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-300 drop-shadow-[0_0_5px_rgba(253,224,71,0.8)]" />
                          ) : (
                            <div className={`w-5 h-5 sm:w-7 sm:h-7 ${piece.player === 'gryffindor' ? 'text-orange-300' : 'text-green-300'}`}>
                              {piece.player === 'gryffindor' ? (
                                <Flame className="w-full h-full drop-shadow-[0_0_5px_rgba(251,146,60,0.8)]" />
                              ) : (
                                <Zap className="w-full h-full drop-shadow-[0_0_5px_rgba(134,239,172,0.8)]" />
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              ))}
            </div>
          </div>

          {mustCapture && !isThinking && (
            <div className="mt-2 sm:mt-4 p-2 sm:p-4 bg-red-950/70 border-2 border-red-600 rounded-lg text-center shadow-[0_0_20px_rgba(220,38,38,0.3)]">
              <p className="text-red-300 font-bold flex items-center justify-center gap-2 text-xs sm:text-base">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Ataque obrigatório! Destrua o inimigo!</span>
                <span className="sm:hidden">Ataque obrigatório!</span>
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              </p>
            </div>
          )}
        </div>
      </div>

      {winner && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-stone-900 to-slate-900 p-6 sm:p-10 rounded-2xl border-2 sm:border-4 border-stone-600 text-center max-w-md w-full shadow-2xl">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_40px_rgba(251,191,36,0.6)]">
              <Crown className="w-10 h-10 sm:w-16 sm:h-16 text-yellow-100" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-stone-200 mb-2 sm:mb-4">
              {winner === 'gryffindor' ? '🦁 Grifinória Vence!' : '🐍 Sonserina Vence!'}
            </h2>
            <p className="text-stone-400 mb-6 sm:mb-8 text-sm sm:text-lg italic">
              {gameMode === 'cpu' 
                ? (winner === 'gryffindor' ? 'Você derrotou o Bruxo das Trevas!' : 'O Bruxo das Trevas foi vitorioso!')
                : `A ${winner === 'gryffindor' ? 'bravura' : 'astúcia'} conquistou o tabuleiro!`
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={resetGame}
                className="flex-1 px-6 py-3 bg-red-800 active:bg-red-700 text-stone-100 font-bold rounded-lg transition-colors shadow-lg border-2 border-red-700 text-sm sm:text-base touch-manipulation"
              >
                Nova Batalha
              </button>
              <button
                onClick={() => setGameMode(null)}
                className="flex-1 px-6 py-3 bg-stone-700 active:bg-stone-600 text-stone-100 font-bold rounded-lg transition-colors shadow-lg border-2 border-stone-600 text-sm sm:text-base touch-manipulation"
              >
                Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HarryPotterCheckers;
