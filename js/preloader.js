// Hoja de js para el loader

window.onload = function(){
    setTimeout(()=>{
        $("#preloader").fadeOut();
        $("body").removeClass("hidden");
    },2000)
}

// window.reload 

