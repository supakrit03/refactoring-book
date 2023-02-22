function str_reverse(arr) {
  let reversed = "";
  for (str of arr) {
    reversed = str + reversed;
  }

  return reversed;
}

function str_reverse2(arr) {
  let reversed = "";
  for (let index = arr.length; index >= 0; index--) {
    reversed += arr.charAt(index);
  }

  return reversed;
}

console.log(str_reverse("abcde"));
console.log(str_reverse2("abcde"));
