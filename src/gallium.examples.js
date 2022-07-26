import { ref } from "vue";

const examples = [
  {
    name: "Brainfuck",
    url: "https://raw.githubusercontent.com/phath0m/Gallium/master/examples/brainfuck.ga"
  },
  {
    name: "Iterators",
    url: "https://raw.githubusercontent.com/phath0m/Gallium/master/examples/iterators.ga"
  },
  { 
    name: "Fibonacci",
    url: "https://raw.githubusercontent.com/phath0m/Gallium/master/examples/fib.ga"
  },
  { 
    name: "Prime Sieves",
    url: "https://raw.githubusercontent.com/phath0m/Gallium/master/examples/primes.ga"
  }
];

export default () => ref(examples);