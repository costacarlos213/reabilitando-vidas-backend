export function generateResetedPasswordEmail(): string {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" style="font-family: &quot;Roboto&quot;, sans-serif;">
    <head style="font-family: &quot;Roboto&quot;, sans-serif;">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" style="font-family: &quot;Roboto&quot;, sans-serif;">
      <title style="font-family: &quot;Roboto&quot;, sans-serif;"> Senha alterada com sucesso! </title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" style="font-family: &quot;Roboto&quot;, sans-serif;">
      
      
    </head>
    <body style="margin: 0;padding: 0;font-family: &quot;Roboto&quot;, sans-serif;">
    
        <div class="bar" style="font-family: &quot;Roboto&quot;, sans-serif;background-color: #E22454;height: 3vh;"> </div>
        <section style="font-family: &quot;Roboto&quot;, sans-serif;">
            <h1 style="font-family: &quot;Roboto&quot;, sans-serif;text-align: center;margin-right: 10px;margin-left: 10px;">Olá, </h1>
            <h3 style="font-family: &quot;Roboto&quot;, sans-serif;text-align: center;margin-right: 10px;margin-left: 10px;"> Sua senha foi alterada com sucesso! </h3>
            
            <h3 style="font-family: &quot;Roboto&quot;, sans-serif;text-align: center;margin-right: 10px;margin-left: 10px;"> Faça login com sua nova senha! </h3>
        </section>
    
    
        <section style="font-family: &quot;Roboto&quot;, sans-serif;">
            <hr style="font-family: &quot;Roboto&quot;, sans-serif;">
            <p class="alert" style="font-family: &quot;Roboto&quot;, sans-serif;color: red;margin-left: 20px;margin-right: 20px;text-align: center;"> Se por acaso você não alterou sua senha, por segurança, entre em contato conosco imediatamente. </p>
        </section>
        
        <footer style="font-family: &quot;Roboto&quot;, sans-serif;background-color: black;color: white;padding: 20px 20px;margin-top: 30px;text-align: center;">
            <h4 style="font-family: &quot;Roboto&quot;, sans-serif;margin-top: 0px;margin-bottom: 5px;"> Consultório Reabilitando Vidas </h4>
            <p style="font-family: &quot;Roboto&quot;, sans-serif;font-size: 12px;margin-top: 8px;margin-bottom: 0px;"> Estr. Bragantina, 751 - Conj. Hab. Sao Jose, Campo Limpo Paulista - SP</p>
            <p style="font-family: &quot;Roboto&quot;, sans-serif;font-size: 12px;margin-top: 8px;margin-bottom: 0px;"> +55 (11) 94066-6426 </p>
        </footer>
    
        
        
    </body>
    </html>
  `
}
