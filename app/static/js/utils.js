const shuffleArray = (array) => {
    for (let i = array.length; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

module.exports = {
    shuffleArray
}