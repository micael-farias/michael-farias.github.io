document.addEventListener("DOMContentLoaded",function(){new SweetScroll({}),particlesJS("particles-js",{particles:{number:{value:30,density:{enable:!0,value_area:800}},color:{value:"#ffffff"},shape:{type:"polygon",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:.5,random:!1,anim:{enable:!1,speed:1,opacity_min:.1,sync:!1}},size:{value:3,random:!0,anim:{enable:!1,speed:19.18081918081918,size_min:.1,sync:!1}},line_linked:{enable:!0,distance:150,color:"#ffffff",opacity:.4,width:1},move:{enable:!0,speed:4,direction:"none",random:!0,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}},nb:80},interactivity:{detect_on:"canvas",events:{onhover:{enable:!1,mode:"grab"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:8,speed:3},repulse:{distance:200,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0})},!1);
document.addEventListener('DOMContentLoaded', function() {
    var copyEmailBtn = document.getElementById('copyEmailBtn');
    
    copyEmailBtn.addEventListener('click', function(event) {
        event.preventDefault();
        
        var emailAddress = 'pedroems.147@gmail.com';
        
        navigator.clipboard.writeText(emailAddress).then(function() {
            // Criação de um elemento de notificação
            var notification = document.createElement('div');
            notification.textContent = 'E-mail copied to clipboard!';
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.backgroundColor = '#4CAF50';
            notification.style.color = 'white';
            notification.style.padding = '15px';
            notification.style.borderRadius = '5px';
            notification.style.zIndex = '1000';
            
            // Adiciona a notificação ao corpo do documento
            document.body.appendChild(notification);
            
            // Remove a notificação após 3 segundos
            setTimeout(function() {
                document.body.removeChild(notification);
            }, 3000);
        }).catch(function(err) {
            console.error('Erro ao copiar texto: ', err);
        });
    });
});