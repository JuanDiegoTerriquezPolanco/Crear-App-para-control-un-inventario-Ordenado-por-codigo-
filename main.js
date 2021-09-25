//CLASE PARA LOS OBJETOS PRODUCTOS
class Product{
    constructor(id, name, amount, cost){
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.cost = cost;
    }
    getTotal(){
        return this.amount * this.cost;
    }
    //IMPRIME LOS RESULTADOS EN HTML
    infoHTML(){
        return `| ${this.id} | ${this.name} | ${this.amount} | ${this.cost} | ${this.getTotal()}<br>`;
    }
}
//CLASE PARA LOS FUNCIONES DE LOS PRODUCTOS
class Depot{
    constructor(){
        this.products = new Array();
    }
    //SI EXISTE DEVUELVE EL INDICE, SINO -1
    _searchIndex(id) {
        for(let i = 0; i < this.products.length; i++){
            if(id == this.products[i].id){
                return i;
            }
        }
        return -1;
    }
    //AGREGAR PRODUCTOS
    add(product){
        //VALIDADO A 20 PRODUCTOS
        if (this.products.length<20) {
            //RETORNA NULL DE EXISTIR EL PRODUCTO, SINO AGREGA
            if(this._searchIndex(product.id) >= 0){
                return null;
            }else{
                for(let i = 0; i < this.products.length; i++){
                    if(product.id < this.products[i].id){
                        this.products.push(this.products[this.products.length-1]);
                        for(let j = this.products.length-1; j > i; j--){
                            this.products[j] = this.products[j-1];
                        }
                        this.products[i] = product;
                        return product;
                    }
                }
                this.products.push(product);
                return product;
            }
        }
    }
    //ELIMINA PRODUCTOS
    delete(id){
        let index = this._searchIndex(id);
        
        //RETORNA NULL DE EXISTIR EL PRODUCTO, SINO ELIMINA
        if (index >= 0){
            let product = this.products[index];
            for (let i = index; i < this.products.length-1; i++){
                this.products[i] = this.products[i+1];
            }
            this.products.pop();
            return product;
        }else{
            return null;
        }
    }
    //BUSCA PRODUCTOS
    search(id){
        //RETORNA EL PRODUCTO EN CASO DE EXISTIR, SINO NULL
        if (this._searchIndex(id) >= 0) {
            return this.products[this._searchIndex(id)];
        }
        return null
    }
    //LISTA LOS PRODUCTOS POR DEFAULT
    listDefautl(){
        let table = '';
        for(let i = 0; i < this.products.length; i++){
            table +=  this.products[i].infoHTML();
        }
        return table;
    }
    //LISTA LOS PRODUCTOS AL REVES
    listReverse(){
        let table = '';
        for(let i = this.products.length - 1; i >= 0 ; i--){
            table += this.products[i].infoHTML();
        }
        return table;
    }
}

class Interface{
    //IMPRIME LOS VALORES RETORNADOS EN HTML
    addProduct(newData){
        let details=document.getElementById('details');
        details.innerHTML = newData.infoHTML();
    }
    //IMPRIME LAS TABLAS EN HTML
    showProduct(newData){
        let details=document.getElementById('details');
        details.innerHTML = `${newData}`;
    }
}
//RECOLECCION DE DATOS
let depot = new Depot();
let ui = new Interface();
//TOMA ACCION DE BOTON PARA FUNCION AGREGAR
const btnAdd=document.getElementById('btnAdd');
btnAdd.addEventListener('click',()=>{
    let id = document.getElementById('idAdd').value;
    let name = document.getElementById('name').value;
    let amount = document.getElementById('amount').value;
    let cost = document.getElementById('cost').value;
    let product = new Product(id, name, amount, cost);
    ui.addProduct(depot.add(product));
});

//TOMA ACCION DE BOTON PARA FUNCION ELIMINAR
const btnDelete=document.getElementById('btnDelete');
btnDelete.addEventListener('click',()=>{
    let id = document.getElementById('idDelete').value;
    ui.addProduct(depot.delete(id));
});

//TOMA ACCION DE BOTON PARA FUNCION BUSCAR
const btnSearch=document.getElementById('btnSearch');
btnSearch.addEventListener('click',()=>{
    let id = document.getElementById('idSearch').value;
    ui.addProduct(depot.search(id));
});

//TOMA ACCION DE BOTON PARA FUNCION LISTAR DEFAULT
const btnDefault=document.getElementById('btnListDefault');
btnDefault.addEventListener('click',()=>{
    ui.showProduct(depot.listDefautl());
});

//TOMA ACCION DE BOTON PARA FUNCION LISTAR REVES
const btnReverse=document.getElementById('btnListReverse');
btnReverse.addEventListener('click',()=>{
    ui.showProduct(depot.listReverse());
});