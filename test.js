

function findMax(arr, num) {

    let returnValue = 0;
    for(let key of arr) {
        if(key === num) {
            returnValue++;
        }
    }

    return returnValue;

}

console.log(findMax([2,2,1,5,6,8,1,2,2], 2))