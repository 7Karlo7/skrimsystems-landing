const menuBtn=document.getElementById("menuBtn");const navLinks=document.getElementById("navLinks");if(menuBtn&&navLinks){menuBtn.addEventListener("click",()=>{navLinks.classList.toggle("open")});navLinks.querySelectorAll("a").forEach(link=>{link.addEventListener("click",()=>navLinks.classList.remove("open"))})}document.querySelectorAll(".faq button").forEach(button=>{button.addEventListener("click",()=>{const answer=button.nextElementSibling;const symbol=button.querySelector("span");answer.classList.toggle("open");symbol.textContent=answer.classList.contains("open")?"−":"+"})});const form=document.getElementById("contactForm");if(form){form.addEventListener("submit",event=>{event.preventDefault();const data=new FormData(form);const subject=encodeURIComponent("Upit za DentalFlow");const body=encodeURIComponent(`Ime i prezime: ${data.get("name")||""}
`+`Naziv ordinacije: ${data.get("clinic")||""}
`+`Email: ${data.get("email")||""}
`+`Telefon: ${data.get("phone")||""}

`+`Poruka:
${data.get("message")||""}`);window.location.href=`mailto:info@skrimsystems.com?subject=${subject}&body=${body}`})}