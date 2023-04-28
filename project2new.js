let index=1;
let arr=[];
function lib(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}
function Display() {
    
}
Display.prototype.add=function(book) {
    arr.push(book);
    localStorage.setItem("books",JSON.stringify(arr));
    show();
   
}
function  show() {
    let tablebody=document.getElementById('tablebody');
    let notes=localStorage.getItem("books");
    if (notes == null) {
        notesObj = [];
      } else {
        notesObj = JSON.parse(notes);
      }
      let html = "";
     notesObj.forEach(function(element,i){
        if(element.name.length>=3 && element.author.length>=3 && element.type.length>=3){
            html+=`
            <div class="divclass" ">
            <tr>
            <td>${i+1}</td>       
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            <td><button id="${i}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button></td>
          </tr> </div>`
          } 
    });
    tablebody.innerHTML=html;
}
function deleteNote(ind) {
    console.log("deleteing",ind);
    arr.splice(ind,1);
 localStorage.setItem("books",JSON.stringify(arr));
 show();
}

 Display.prototype.validate=function(book) {
    if(book.name.length>=3 && book.author.length>=3 && book.type.length>=3){return true;}
    else{return false;}
}
Display.prototype.clear=function() {
    let libraryform = document.getElementById('libraryForm');
    libraryform.reset();
    
}
Display.prototype.show=function(type,message) {
    let alert=document.getElementById('alertmessage');
    let boldtext;
    if(type==='error'){boldtext='error';}
    else{
        boldtext='Success';
    }
   
    alert.innerHTML=`
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
  <strong>${boldtext}!</strong> ${message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
    `
    setTimeout(function(){
        alert.innerHTML='';
    },3000);
}


function prototype() {

}

let libraryform = document.getElementById('addbookbtn');
libraryform.addEventListener('click', libraryformsubmit);
function libraryformsubmit(e) {
    
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    let book = new lib(name, author, type);
    console.log(book);
    let display=new Display();
    if(display.validate(book)){
   
    display.add(book);
    display.clear();
    localStorage.setItem("books",JSON.stringify(arr));
    display.show("success","Book SuccesFully Added"); }
    else{
        display.show("error","Please Fill Valid Details");
    }
    
    e.preventDefault();
}
