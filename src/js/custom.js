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