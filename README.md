# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

-------- Deploy Client to Vercel -----
1. create vercel.json

{
    "routes":[
        {
            "src":"/[^.]+",
            "dest":"/"
        }
    ]
}

2. git init
3. git add .
4. git commit -m "init"

5. add project to vercel 
/* Enjoy */