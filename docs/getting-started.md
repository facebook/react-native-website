---<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hie Design - Application de Design Graphique</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #6a11cb;
            --secondary-color: #2575fc;
            --accent-color: #ff2d75;
            --light-bg: #f8f9fa;
            --dark-bg: #2d3748;
            --darker-bg: #1a202c;
            --text-light: #ffffff;
            --text-dark: #2d3748;
            --text-gray: #718096;
            --sidebar-width: 280px;
            --topbar-height: 60px;
            --border-radius: 8px;
            --transition: all 0.3s ease;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: var(--light-bg);
            color: var(--text-dark);
            overflow: hidden;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .topbar {
            height: var(--topbar-height);
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: var(--text-light);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
            z-index: 100;
        }

        .logo {
            font-weight: bold;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
        }

        .logo i {
            margin-right: 10px;
            font-size: 1.8rem;
        }

        .main-container {
            display: flex;
            flex: 1;
            overflow: hidden;
        }

        .sidebar {
            width: var(--sidebar-width);
            background-color: var(--dark-bg);
            color: var(--text-light);
            overflow-y: auto;
            transition: var(--transition);
            display: flex;
            flex-direction: column;
        }

        .sidebar-section {
            padding: 15px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .sidebar-title {
            font-size: 0.9rem;
            text-transform: uppercase;
            margin-bottom: 15px;
            opacity: 0.7;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .sidebar-title i {
            cursor: pointer;
            opacity: 0.7;
            transition: var(--transition);
        }

        .sidebar-title i:hover {
            opacity: 1;
        }

        .tools-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }

        .tool-btn {
            background-color: rgba(255,255,255,0.1);
            border: none;
            color: var(--text-light);
            padding: 10px;
            border-radius: var(--border-radius);
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: var(--transition);
            position: relative;
        }

        .tool-btn:hover {
            background-color: rgba(255,255,255,0.2);
            transform: translateY(-2px);
        }

        .tool-btn.active {
            background-color: var(--accent-color);
        }

        .tool-btn i {
            font-size: 1.2rem;
            margin-bottom: 5px;
        }

        .tool-btn span {
            font-size: 0.8rem;
        }

        .workspace {
            flex: 1;
            background-color: #e9ecef;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
        }

        .toolbar {
            padding: 10px 20px;
            background-color: white;
            border-bottom: 1px solid #dee2e6;
            display: flex;
            align-items: center;
            gap: 15px;
            flex-wrap: wrap;
        }

        .toolbar-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px 12px;
            border-radius: var(--border-radius);
            display: flex;
            align-items: center;
            gap: 5px;
            transition: var(--transition);
            font-size: 0.9rem;
        }

        .toolbar-btn:hover {
            background-color: #f1f3f5;
        }

        .toolbar-btn.primary {
            background-color: var(--primary-color);
            color: white;
        }

        .toolbar-btn.primary:hover {
            background-color: var(--secondary-color);
        }

        .canvas-container {
            flex: 1;
            overflow: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            background-image: 
                linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
                linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
                linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }

        .canvas {
            background-color: white;
            box-shadow: 0 5px 25px rgba(0,0,0,0.15);
            position: relative;
            width: 800px;
            height: 600px;
        }

        .canvas-object {
            position: absolute;
            cursor: move;
            border: 2px dashed transparent;
            transition: var(--transition);
        }

        .canvas-object.selected {
            border-color: var(--accent-color);
        }

        .canvas-object.text {
            padding: 10px;
            min-width: 100px;
            min-height: 40px;
            resize: both;
            overflow: hidden;
            background: transparent;
            font-family: 'Arial', sans-serif;
        }

        .canvas-object.image {
            object-fit: contain;
        }

        .canvas-object.shape {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--primary-color);
        }

        .layers-panel {
            width: 250px;
            background-color: white;
            border-left: 1px solid #dee2e6;
            padding: 15px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        }

        .layer-item {
            padding: 10px;
            border-bottom: 1px solid #dee2e6;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: var(--transition);
        }

        .layer-item:hover {
            background-color: #f8f9fa;
        }

        .layer-item.selected {
            background-color: #e6f7ff;
        }

        .layer-thumbnail {
            width: 30px;
            height: 30px;
            background-color: #e9ecef;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.8rem;
            border-radius: 4px;
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }

        .modal-content {
            background-color: white;
            padding: 25px;
            border-radius: var(--border-radius);
            width: 450px;
            max-width: 90%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .modal-title {
            font-size: 1.5rem;
            margin-bottom: 20px;
            color: var(--text-dark);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .modal-title i {
            color: var(--primary-color);
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: var(--border-radius);
            font-size: 1rem;
        }

        .modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 20px;
        }

        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-weight: 500;
            transition: var(--transition);
        }

        .btn-primary {
            background-color: var(--primary-color);
            color: white;
        }

        .btn-primary:hover {
            background-color: var(--secondary-color);
        }

        .btn-secondary {
            background-color: #e9ecef;
            color: var(--text-dark);
        }

        .btn-secondary:hover {
            background-color: #dee2e6;
        }

        .color-picker {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .color-swatch {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 0 5px rgba(0,0,0,0.2);
        }

        .language-selector {
            display: flex;
            gap: 5px;
            align-items: center;
        }

        .lang-btn {
            padding: 5px 10px;
            border: 1px solid rgba(255,255,255,0.3);
            background: transparent;
            color: rgba(255,255,255,0.8);
            border-radius: 4px;
            cursor: pointer;
            transition: var(--transition);
        }

        .lang-btn.active {
            background-color: rgba(255,255,255,0.2);
            color: white;
            border-color: transparent;
        }

        .properties-panel {
            padding: 15px;
            border-top: 1px solid rgba(255,255,255,0.1);
        }

        .property-group {
            margin-bottom: 15px;
        }

        .property-group-title {
            font-size: 0.9rem;
            margin-bottom: 10px;
            opacity: 0.7;
        }

        .property-row {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }

        .property-label {
            width: 80px;
            font-size: 0.8rem;
            opacity: 0.8;
        }

        .property-input {
            flex: 1;
            padding: 5px;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 4px;
            background: rgba(0,0,0,0.1);
            color: white;
        }

        @media (max-width: 1200px) {
            .sidebar {
                width: 70px;
            }
            
            .sidebar-section .sidebar-title,
            .tool-btn span {
                display: none;
            }
            
            .tools-grid {
                grid-template-columns: 1fr;
            }
            
            .layers-panel {
                width: 200px;
            }
        }

        @media (max-width: 900px) {
            .main-container {
                flex-direction: column;
            }
            
            .sidebar {
                width: 100%;
                height: auto;
                flex-direction: row;
                overflow-x: auto;
            }
            
            .sidebar-section {
                border-bottom: none;
                border-right: 1px solid rgba(255,255,255,0.1);
                min-width: 200px;
            }
            
            .tools-grid {
                grid-template-columns: repeat(3, 1fr);
            }
            
            .tool-btn span {
                display: block;
            }
            
            .layers-panel {
                width: 100%;
                height: 150px;
                border-left: none;
                border-top: 1px solid #dee2e6;
            }
        }

        /* Animation pour les nouveaux éléments */
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }

        .fade-in {
            animation: fadeIn 0.3s ease;
        }

        /* Styles pour le texte en arabe */
        .rtl {
            direction: rtl;
            text-align: right;
        }
    </style>
</head>
<body>
    <div class="topbar">
        <div class="logo">
            <i class="fas fa-palette"></i>
            <span>Hie Design</span>
        </div>
        <div class="language-selector">
            <button class="lang-btn active" data-lang="fr">FR</button>
            <button class="lang-btn" data-lang="en">EN</button>
            <button class="lang-btn" data-lang="ar">AR</button>
        </div>
        <div>
            <button class="toolbar-btn primary" id="save-btn">
                <i class="fas fa-save"></i> Sauvegarder
            </button>
            <button class="toolbar-btn primary" id="export-btn">
                <i class="fas fa-download"></i> Exporter
            </button>
        </div>
    </div>

    <div class="main-container">
        <div class="sidebar">
            <div class="sidebar-section">
                <div class="sidebar-title">
                    <span>Outils</span>
                    <i class="fas fa-question-circle" title="Aide"></i>
                </div>
                <div class="tools-grid">
                    <button class="tool-btn" data-tool="select">
                        <i class="fas fa-mouse-pointer"></i>
                        <span>Sélection</span>
                    </button>
                    <button class="tool-btn" data-tool="text">
                        <i class="fas fa-font"></i>
                        <span>Texte</span>
                    </button>
                    <button class="tool-btn" data-tool="rectangle">
                        <i class="fas fa-square"></i>
                        <span>Rectangle</span>
                    </button>
                    <button class="tool-btn" data-tool="circle">
                        <i class="fas fa-circle"></i>
                        <span>Cercle</span>
                    </button>
                    <button class="tool-btn" data-tool="image">
                        <i class="fas fa-image"></i>
                        <span>Image</span>
                    </button>
                    <button class="tool-btn" data-tool="draw">
                        <i class="fas fa-pencil-alt"></i>
                        <span>Dessin</span>
                    </button>
                </div>
            </div>

            <div class="sidebar-section">
                <div class="sidebar-title">
                    <span>Modèles</span>
                    <i class="fas fa-plus" title="Ajouter"></i>
                </div>
                <div class="tools-grid">
                    <button class="tool-btn" data-template="post">
                        <i class="fas fa-thumbtack"></i>
                        <span>Posts</span>
                    </button>
                    <button class="tool-btn" data-template="card">
                        <i class="fas fa-id-card"></i>
                        <span>Cartes</span>
                    </button>
                    <button class="tool-btn" data-template="flyer">
                        <i class="fas fa-flag"></i>
                        <span>Flyers</span>
                    </button>
                    <button class="tool-btn" data-template="poster">
                        <i class="fas fa-sign"></i>
                        <span>Affiches</span>
                    </button>
                    <button class="tool-btn" data-template="logo">
                        <i class="fas fa-certificate"></i>
                        <span>Logos</span>
                    </button>
                </div>
            </div>
            
            <div class="properties-panel">
                <div class="property-group">
                    <div class="property-group-title">Propriétés</div>
                    <div class="property-row">
                        <div class="property-label">Couleur:</div>
                        <input type="color" class="property-input" id="color-picker" value="#4361ee">
                    </div>
                    <div class="property-row">
                        <div class="property-label">Taille:</div>
                        <input type="range" class="property-input" id="size-slider" min="1" max="100" value="16">
                    </div>
                    <div class="property-row">
                        <div class="property-label">Police:</div>
                        <select class="property-input" id="font-select">
                            <option value="Arial">Arial</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Courier New">Courier New</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="workspace">
            <div class="toolbar">
                <button class="toolbar-btn" id="new-btn">
                    <i class="fas fa-plus"></i> Nouveau
                </button>
                <button class="toolbar-btn" id="open-btn">
                    <i class="fas fa-folder-open"></i> Ouvrir
                </button>
                <button class="toolbar-btn" id="undo-btn">
                    <i class="fas fa-undo"></i> Annuler
                </button>
                <button class="toolbar-btn" id="redo-btn">
                    <i class="fas fa-redo"></i> Rétablir
                </button>
                <div style="flex: 1;"></div>
                <button class="toolbar-btn" id="zoom-in-btn">
                    <i class="fas fa-search-plus"></i> Zoom +
                </button>
                <button class="toolbar-btn" id="zoom-out-btn">
                    <i class="fas fa-search-minus"></i> Zoom -
                </button>
            </div>

            <div class="canvas-container">
                <div class="canvas" id="main-canvas">
                    <!-- Les objets seront ajoutés ici dynamiquement -->
                </div>
            </div>
        </div>

        <div class="layers-panel">
            <div class="sidebar-title">Calques</div>
            <div class="layer-item selected">
                <div class="layer-thumbnail">T</div>
                <div>Texte principal</div>
            </div>
            <div class="layer-item">
                <div class="layer-thumbnail">Img</div>
                <div>Image d'arrière-plan</div>
            </div>
            <div class="layer-item">
                <div class="layer-thumbnail">S</div>
                <div>Forme décorative</div>
            </div>
        </div>
    </div>

    <!-- Modal d'exportation -->
    <div class="modal" id="export-modal">
        <div class="modal-content fade-in">
            <h2 class="modal-title">
                <i cla
id: environment-setup
title: Get Started with React Native
hide_table_of_contents: true
---

import PlatformSupport from '@site/src/theme/PlatformSupport';
import BoxLink from '@site/src/theme/BoxLink';

**React Native allows developers who know React to create native apps.** At the same time, native developers can use React Native to gain parity between native platforms by writing common features once.

We believe that the best way to experience React Native is through a **Framework**, a toolbox with all the necessary APIs to let you build production ready apps.

You can also use React Native without a Framework, however we’ve found that most developers benefit from using a React Native Framework like [Expo](https://expo.dev). Expo provides features like file-based routing, high-quality universal libraries, and the ability to write plugins that modify native code without having to manage native files.

<details>
<summary>Can I use React Native without a Framework?</summary>

Yes. You can use React Native without a Framework. **However, if you’re building a new app with React Native, we recommend using a Framework.**

In short, you’ll be able to spend time writing your app instead of writing an entire Framework yourself in addition to your app.

The React Native community has spent years refining approaches to navigation, accessing native APIs, dealing with native dependencies, and more. Most apps need these core features. A React Native Framework provides them from the start of your app.

Without a Framework, you’ll either have to write your own solutions to implement core features, or you’ll have to piece together a collection of pre-existing libraries to create a skeleton of a Framework. This takes real work, both when starting your app, then later when maintaining it.

If your app has unusual constraints that are not served well by a Framework, or you prefer to solve these problems yourself, you can make a React Native app without a Framework using Android Studio, Xcode. If you’re interested in this path, learn how to [set up your environment](set-up-your-environment) and how to [get started without a framework](getting-started-without-a-framework).

</details>

## Start a new React Native project with Expo

<PlatformSupport platforms={['android', 'ios', 'tv', 'web']} />

Expo is a production-grade React Native Framework. Expo provides developer tooling that makes developing apps easier, such as file-based routing, a standard library of native modules, and much more.

Expo's Framework is free and open source, with an active community on [GitHub](https://github.com/expo) and [Discord](https://chat.expo.dev). The Expo team works in close collaboration with the React Native team at Meta to bring the latest React Native features to the Expo SDK.

The team at Expo also provides Expo Application Services (EAS), an optional set of services that complements Expo, the Framework, in each step of the development process.

To create a new Expo project, run the following in your terminal:

```shell
npx create-expo-app@latest
```

Once you’ve created your app, check out the rest of Expo’s getting started guide to start developing your app.

<BoxLink href="https://docs.expo.dev/get-started/set-up-your-environment">Continue with Expo</BoxLink>
