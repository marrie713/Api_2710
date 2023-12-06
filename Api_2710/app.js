import express from 'express';
import cors from 'cors';
import { Celulares } from './lista.js';

//objeto//

 let Listacelulares = [
    new Celulares(24, "samsung", 2500, 2022),
    new Celulares(54, "Iphone", 2500, 2021),
    new Celulares(92, "Motorola", 2500, 2023),
    new Celulares(18, "Lg", 2500, 2018)
   ]   


const celular = express();
celular.use(express.json());
celular.use(cors());
celular.use(express.urlencoded({extended: true}));

celular.get("/", (req, res)=>{
    return res.status(200).json(Listacelulares)
})

celular.post("/novo", (req, res)=>{
    const { codigo, modelo, preco, ano_lancamento } = req.body;
    Listacelulares.push(new Celulares(Listacelulares.length + 1, codigo, modelo, preco, ano_lancamento));
    return res.status(200).json("cadastrado com sucesso!");
})

celular.put("/produtos/alterar/:codigo", (req,res)=>{
    const { codigo } = req.params;
    const {modelo, preco, ano_lancamento} = req.body;
    let produtos = Listacelulares.find(obj => obj.codigo == codigo);
    produtos.modelo = modelo;
    produtos.preco = preco;
    produtos.ano_lancamento = ano_lancamento;
    return res.status(200).json("Alterado com sucesso!");
})

celular.delete("/produtos/excluir/:codigo",(req,res)=>{
    const { codigo } = req.params;
    Listacelulares = Listacelulares.filter(p => p.codigo != codigo);
    return res.status(200).json("Deletado");
})

celular.listen(4000, ()=>{
    console.log("Api no ar!");
})