/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
function renderCafe(doc) {
  const li = document.createElement('li');
  const name = document.createElement('span');
  const city = document.createElement('span');
  const cross =document.createElement('div')
  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'x'
  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);
  cafeList.appendChild(li);
  cross.addEventListener('click',(e)=>{
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    console.log(id);
    db.collection('cafes').doc(id).delete();
  })
}
// db.collection('cafes').where('name','==','shaheed').orderBy('city').get().then((snapshot) => {
//   snapshot.docs.forEach((doc) => {
//     renderCafe(doc);
//   });
// });


form.addEventListener('submit',(e)=>{
  e.preventDefault();
  db.collection('cafes').add({
    name:form.name.value,
    city:form.city.value
  });
  form.name.value='';
  form.city.value='';
})
//realtime listener

db.collection('cafes').orderBy('city').onSnapshot(snapshot=>{
  let changes =snapshot.docChanges();
changes.forEach(change => {
  if(change.type == 'added'){
    renderCafe(change.doc);
  }else if(change.type =='removed'){
    let li =cafeList.querySelector('[data-id='+ change.doc.id +']');
    cafeList.removeChild(li);
  }
  
});
})
