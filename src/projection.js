const project = () => {

};

const projectTest = async () => {
    const stars = document.getElementsByTagName("star");
    console.log("[*] Projecting...")
    const { innerWidth, innerHeight } = window;
    for (let index = 0; index < stars.length; index++) {
        stars[index].style.left = `${innerWidth * Math.random()}px`;
        stars[index].style.top = `${innerHeight * Math.random()}px`;
    }
    return;
};