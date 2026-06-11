const menuBtn=document.getElementById("menuBtn"),navLinks=document.getElementById("navLinks");if(menuBtn&&navLinks){menuBtn.addEventListener("click",()=>navLinks.classList.toggle("open"));navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")))}document.querySelectorAll(".faq button").forEach(btn=>{btn.addEventListener("click",()=>{const ans=btn.nextElementSibling,plus=btn.querySelector("span");ans.classList.toggle("open");plus.textContent=ans.classList.contains("open")?"−":"+"})});const form=document.getElementById("contactForm");if(form){form.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(form);const subject=encodeURIComponent("Upit za DentalFlow");const body=encodeURIComponent(`Ime i prezime: ${d.get("name")||""}
Naziv ordinacije: ${d.get("clinic")||""}
Email: ${d.get("email")||""}
Telefon: ${d.get("phone")||""}

Poruka:
${d.get("message")||""}`);window.location.href=`mailto:info@skrimsystems.com?subject=${subject}&body=${body}`})}