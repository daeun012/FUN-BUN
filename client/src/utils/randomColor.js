const colors = ['#f94144', '#f3722c', '#f8961e', '#f9844a', '#f9c74f', '#90be6d', '#43aa8b', '#4d908e', '#577590', '#277da1'];

export default function colorFrom(string) {
  try {
    // index is the sum of unicdoe values of string letters
    const index = string
      .toString()
      .split('')
      .map((char) => char.charCodeAt())
      .reduce((sum, num) => sum + num, 0);
    // The charCodeAt() method returns the Unicode of the character
    // at the specified index in a string.
    // reduce will loop through an array adding
    // each element to an accumulator(sum) and returning it
    // The 0 at the end initializes accumulator to start at 0
    const colorIndex = index % colors.length;
    // will select the index from colors array
    return colors[colorIndex][500];
    // 500 is the colour shade value
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
    return '#6699CC';
    // default color value
  }
}
