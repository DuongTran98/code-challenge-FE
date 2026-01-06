// Recursive implementation
// Time Complexity: O(n), Space Complexity: O(n) due to recursion stack
function sum_to_n_a(n) {
    if (n <= 0)
        return 0;
    if (n === 1)
        return 1;
    return n + sum_to_n_a(n - 1);
}
// Iterative implementation
// Time Complexity: O(n), Space Complexity: O(1)
function sum_to_n_b(n) {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
// Formula-based implementation
// Time Complexity: O(1), Space Complexity: O(1)
function sum_to_n_c(n) {
    return n > 0 ? (n * (n + 1)) / 2 : 0;
}
console.log(sum_to_n_a(5)); // 15
console.log(sum_to_n_b(10)); // 55
console.log(sum_to_n_c(0)); // 0
console.log(sum_to_n_a(-3)); // 0
console.log(sum_to_n_b(1)); // 1
console.log(sum_to_n_c(100)); // 5050
