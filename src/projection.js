const project = () => {

};

const projectTest = () => {
    const stars = document.getElementsByTagName("star");
    console.log(stars[0]);
    const { innerWidth, innerHeight } = document;
    console.log(stars.length)
    stars.map((star) =>{
        star.style.left = innerWidth * Math.random();
        star.style.top = innerHeight * Math.random();
    });
    return;
};