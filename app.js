let input=document.querySelector('#input');
let searchBtn=document.querySelector('#search');
let apiKey='9bcdcc27-37dc-469a-aaca-2e6870809f0a';
let notfound=document.querySelector('.not__found');
let defBox=document.querySelector('.def');
let audioBox=document.querySelector('.audio');
let imgBox=document.querySelector('.image');
let loadings=document.querySelector('.loading');


searchBtn.addEventListener('click',function(e){
    e.preventDefault();

    //clear data
    audioBox.innerHTML='';
    audioBox.innerText='';
    defBox.innerText='';
    

    //Get input data
   let word=input.value;

    //call API get data
    if(word===''){
        alert("Word is required");
      return;
    }

    getData(word);
})
 
async function getData(word){
    loadings.style.display = 'block';

    //Ajax call
   const response=await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`)
   const data=await response.json();
   console.log(data);

  // if empty result
  if(!data.length){
    loadings.style.display='none';
    notfound.innertext='Opps!! No Result Found';
    return;
  }

  //if result is suggestion

  if(typeof data[0]==='string'){
    loadings.style.display='none';
    let heading=document.createElement('h3');
    heading.innerText='Did You Mean?';
    notfound.appendChild(heading);
    data.forEach(element => {
        let suggestion=document.createElement('span');
        suggestion.classList.add('suggested');
        suggestion.innerText=element;
        notfound.appendChild(suggestion);
    })
    return;
  }

  //Result found
   loadings.style.display='none';
   let definition=data[0].shortdef[0];
   defBox.innerText=definition;

   //sound
   const soundName=data[0].hwi.prs[0].sound.audio;
   if(soundName){
    renderSound(soundName);
   }
  
  /* //image
    const images=data[0].hwi.prs[0].image;
    if(images){
        renderImage(images);
    }    */

   console.log(data);
}

function renderSound(soundName){
    // https://media.merriam-webster.com/audio/prons/en/us/mp3/p/pajama02.mp3

    let subfolder=soundName.charAt(0);
    let soundSrc=`https://media.merriam-webster.com/audio/prons/en/us/mp3/${subfolder}/${soundName}.mp3`;

    let aud=document.createElement('audio');
    aud.src= soundSrc;
    aud.controls=true;
    audioBox.appendChild(aud);
}

 /*function renderImage(images){
    let sabfolder=images;
    let imageSrc=`https://www.merriam-webster.com/art/dict/${sabfolder}.htm`;

    let img=document.createElement('image');
    img.src=imageSrc;
    img.controls=true;
    imageBox.appendChild(img);
}  */
