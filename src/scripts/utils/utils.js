export const utils = {

    normalize(num, min1, max1, min2, max2) {

        const num1 = (num - min1) / (max1 - min1);
        const num2 = (num1 * (max2 - min2)) + min2;

        return num2;

    }

}
