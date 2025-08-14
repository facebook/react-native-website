# nexuschat3d_unificado.py
# Protótipo unificado: Protótipo 1 + Protótipo 5
# GUI, avatares, salas, mini-jogos, chat online, lives simuladas, conquistas e moeda virtual

import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk
import threading
import socket
import random

# ---------- CONFIGURAÇÃO DE REDE ----------
HOST = '127.0.0.1'
PORT = 12345

# ---------- AVATAR ----------
class Avatar:
    def __init__(self, nome, imagem_path):
        self.nome = nome
        self.imagem_path = imagem_path
        self.imagem = Image.open(imagem_path).resize((100, 100))
        self.photo = ImageTk.PhotoImage(self.imagem)
        self.moeda = 100
        self.conquistas = []

    def adicionar_moeda(self, valor):
        self.moeda += valor

    def ganhar_conquista(self, titulo):
        if titulo not in self.conquistas:
            self.conquistas.append(titulo)

    def mostrar_avatar_console(self):
        print(f"{self.nome} -> Moeda: {self.moeda}, Conquistas: {self.conquistas}")

# ---------- SALAS ----------
class Sala:
    def __init__(self, nome, tipo='publica'):
        self.nome = nome
        self.tipo = tipo
        self.usuarios = []

    def entrar(self, usuario):
        if usuario not in self.usuarios:
            self.usuarios.append(usuario)
            print(f"{usuario} entrou na sala {self.nome}")

    def sair(self, usuario):
        if usuario in self.usuarios:
            self.usuarios.remove(usuario)
            print(f"{usuario} saiu da sala {self.nome}")

# ---------- MINI-JOGO SIMPLES (Protótipo 1) ----------
def mini_jogo_trivia_console(usuarios):
    perguntas = {
        "Qual a capital do Brasil?": "Brasília",
        "Qual a cor do céu?": "azul",
        "Quanto é 2+2?": "4"
    }
    pergunta, resposta = random.choice(list(perguntas.items()))
    print(f"\n🕹️ Mini-jogo Trivia - Pergunta: {pergunta}")
    for usuario in usuarios:
        chute = input(f"{usuario} responde: ")
        if chute.lower() == resposta.lower():
            print(f"{usuario} acertou! ✅")
        else:
            print(f"{usuario} errou. Resposta correta: {resposta} ❌")

# ---------- MINI-JOGO VISUAL (Protótipo 5) ----------
class MiniJogoNumero:
    def __init__(self, master, avatar):
        self.master = master
        self.avatar = avatar
        self.numero_secreto = random.randint(1, 10)

        self.label = tk.Label(master, text="Mini-jogo: Adivinhe o número (1-10)")
        self.label.pack()

        self.entry = tk.Entry(master)
        self.entry.pack()

        self.botao = tk.Button(master, text="Chutar", command=self.checar)
        self.botao.pack()

    def checar(self):
        try:
            chute = int(self.entry.get())
            if chute == self.numero_secreto:
                messagebox.showinfo("Parabéns!", f"Você acertou! Número secreto: {self.numero_secreto}")
                self.avatar.adicionar_moeda(10)
                self.avatar.ganhar_conquista("Acerto no Mini-Jogo")
                self.entry.delete(0, tk.END)
                self.numero_secreto = random.randint(1, 10)
            else:
                messagebox.showwarning("Tente novamente", "Número errado! Tente novamente.")
        except ValueError:
            messagebox.showerror("Erro", "Digite um número válido!")

# ---------- LIVE SIMULADA ----------
class Live:
    def __init__(self, avatar, chat_box):
        self.avatar = avatar
        self.chat_box = chat_box
        self.online = False

    def iniciar(self):
        self.online = True
        self.chat_box.insert(tk.END, f"{self.avatar.nome} começou uma live! 🎥\n")
        self.chat_box.see(tk.END)

    def terminar(self):
        self.online = False
        self.chat_box.insert(tk.END, f"{self.avatar.nome} terminou a live ❌\n")
        self.chat_box.see(tk.END)

# ---------- CLIENTE CHAT ----------
class ChatCliente:
    def __init__(self, master, avatar):
        self.master = master
        self.avatar = avatar
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.connect((HOST, PORT))

        self.chat_box = tk.Text(master, height=10, width=50)
        self.chat_box.pack()
        self.entry_msg = tk.Entry(master, width=40)
        self.entry_msg.pack(side=tk.LEFT)
        self.botao_enviar = tk.Button(master, text="Enviar", command=self.enviar_mensagem)
        self.botao_enviar.pack(side=tk.LEFT)

        threading.Thread(target=self.receber_mensagens, daemon=True).start()

    def enviar_mensagem(self):
        msg = self.entry_msg.get()
        if msg:
            full_msg = f"{self.avatar.nome}: {msg}"
            self.sock.sendall(full_msg.encode())
            self.entry_msg.delete(0, tk.END)

    def receber_mensagens(self):
        while True:
            try:
                data = self.sock.recv(1024)
                if data:
                    self.chat_box.insert(tk.END, data.decode() + "\n")
                    self.chat_box.see(tk.END)
            except:
                break

# ---------- COMUNIDADE ----------
class Comunidade:
    def __init__(self, nome):
        self.nome = nome
        self.membros = []

    def adicionar_membro(self, usuario):
        if usuario not in self.membros:
            self.membros.append(usuario)
            print(f"{usuario} entrou na comunidade {self.nome} 🌐")

# ---------- GUI PRINCIPAL ----------
class NexusChatGUI:
    def __init__(self, master, avatar, sala, comunidade):
        self.master = master
        master.title("NexusChat 3D - Protótipo Unificado")

        self.avatar = avatar
        self.sala = sala
        self.comunidade = comunidade

        # Frame Avatares
        self.frame_avatar = tk.Frame(master)
        self.frame_avatar.pack()
        tk.Label(self.frame_avatar, image=self.avatar.photo).pack(side=tk.LEFT)
        tk.Label(self.frame_avatar, text=self.avatar.nome).pack(side=tk.LEFT)
        tk.Label(self.frame_avatar, text=f"Moeda: {self.avatar.moeda}").pack(side=tk.LEFT)

        # Chat
        self.chat_cliente = ChatCliente(master, avatar)

        # Mini-jogo
        self.mini_jogo = MiniJogoNumero(master, avatar)

        # Live
        self.live = Live(avatar, self.chat_cliente.chat_box)
        self.botao_live_iniciar = tk.Button(master, text="Iniciar Live", command=self.live.iniciar)
        self.botao_live_iniciar.pack()
        self.botao_live_terminar = tk.Button(master, text="Terminar Live", command=self.live.terminar)
        self.botao_live_terminar.pack()

        # Conquistas
        self.botao_conquistas = tk.Button(master, text="Minhas Conquistas", command=self.mostrar_conquistas)
        self.botao_conquistas.pack()

        # Console: mini-jogo trivia (Protótipo 1)
        self.botao_trivia = tk.Button(master, text="Mini-jogo Trivia Console", command=self.trivia_console)
        self.botao_trivia.pack()

    def mostrar_conquistas(self):
        conquistas = "\n".join(self.avatar.conquistas) if self.avatar.conquistas else "Nenhuma conquista ainda."
        messagebox.showinfo("Conquistas", conquistas)

    def trivia_console(self):
        mini_jogo_trivia_console(self.sala.usuarios)

# ---------- EXECUÇÃO ----------
def main():
    nome_usuario = input("Digite seu nome de usuário: ")
    avatar = Avatar(nome_usuario, "avatar1.png")

    # Sala e Comunidade (Protótipo 1)
    sala = Sala("Sala Unificada")
    sala.entrar(avatar.nome)
    comunidade = Comunidade("Gamers Nexus")
    comunidade.adicionar_membro(avatar.nome)

    # Mostrar console do avatar
    avatar.mostrar_avatar_console()

    root = tk.Tk()
    app = NexusChatGUI(root, avatar, sala, comunidade)
    root.mainloop()

if __name__ == "__main__":
    main()
