'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  //.textContent = 0

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => /*return*/ name[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);
  //Display Balance
  calcDisplayBalance(acc);
  //Display Summary
  calcDisplaySummary(acc);
};

//Event Handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add movement
    currentAccount.movements.push(amount);
    //Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    console.log(index);
    //Delete Account
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
// LECTURES
//////////////////////////////////////////////////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////

//Array Methods

///////////////////////////////////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

//Slice
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

//Splice
console.log('splice');
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

//REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//CONCAT
console.log('concat');
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

//JOIN
console.log('JOIN');
console.log(letters.join(' - '));


////////////////////////////////////////////////////////////////////////////////
//At method
///////////////////////////////////////////////////////////////////////////////

const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at([0]));

//Getting the last array element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at([-1]));


////////////////////////////////////////////////////////////////////////////////
//Looping Arrays: Foreach
///////////////////////////////////////////////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
}

console.log('----------------FOREACH----------------');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
});
//0: function(200)
// 1: function(450)
// 2: function(400)
//...


////////////////////////////////////////////////////////////////////////////////
//Looping with Maps and Sets
///////////////////////////////////////////////////////////////////////////////

//Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//Sets
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});


////////////////////////////////////////////////////////////////////////////////
//Challenge 1
///////////////////////////////////////////////////////////////////////////////

const julia1 = [3, 5, 2, 12, 7];
const kate1 = [4, 1, 15, 8, 3];

const julia2 = [9, 16, 6, 8, 3];
const kate2 = [10, 5, 6, 1, 4];

const checkDogs = function (julia, kate) {
  const juliaCorrect = julia.slice(1, -2);
  const arrsComb = [...juliaCorrect, ...kate];
  arrsComb.forEach(function (age, i) {
    age >= 3
      ? console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`)
      : console.log(`Dog number ${i + 1} is still a puppy`);
  });
};

checkDogs(julia1, kate1);
console.log('-----------');
checkDogs(julia2, kate2);


////////////////////////////////////////////////////////////////////////////////
//Map Method
///////////////////////////////////////////////////////////////////////////////

const eurToUsd = 1.1;

// const movementsUsd = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

const movementsUsdArr = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUsdArr, 'Arrow');

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescription);


////////////////////////////////////////////////////////////////////////////////
//Filter Method
///////////////////////////////////////////////////////////////////////////////

const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});

console.log(withdrawals);


////////////////////////////////////////////////////////////////////////////////
//Reduce Method
///////////////////////////////////////////////////////////////////////////////

console.log(movements);

//accumulator is like a snowball
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);

console.log(balance);
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

//Maximum Value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);

console.log(max);


////////////////////////////////////////////////////////////////////////////////
//Challenge 2
///////////////////////////////////////////////////////////////////////////////

const calcAverageHumanAge = function (arr) {
  const humanAge = arr.map(function (age) {
    if (age <= 2) {
      return 2 * age;
    } else if (age > 2) {
      return 16 + age * 4;
    }
  });
  const ageFiltered = humanAge.filter(function (age) {
    return age >= 18;
  });
  const averageAge = ageFiltered.reduce(function (acc, age, i, arr) {
    return acc + age / arr.length;
  }, 0);
  return averageAge;
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


////////////////////////////////////////////////////////////////////////////////
//Chaining Methods
///////////////////////////////////////////////////////////////////////////////

const eurToUsd = 1.1;

//PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);


////////////////////////////////////////////////////////////////////////////////
//Challenge 3
///////////////////////////////////////////////////////////////////////////////

const calcAverageHumanAgeArr = arr =>
  arr
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAgeArr([5, 2, 4, 1, 15, 8, 3]));


////////////////////////////////////////////////////////////////////////////////
//Find Method
///////////////////////////////////////////////////////////////////////////////

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

const accountFor = function (accounts, user) {
  for (const account of accounts) {
    if (account.owner === user) {
      return account.owner;
    }
  }
};

console.log(accountFor(accounts, 'Steven Thomas Williams'));


////////////////////////////////////////////////////////////////////////////////
//Some and Every
///////////////////////////////////////////////////////////////////////////////

//Some
console.log(movements);

//Equality
console.log(movements.includes(-130));

//Condition
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

//Every
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

//Separate Callback
const deposit = mov => mov > 0;
console.log(movements.every(deposit));
console.log(movements.some(deposit));
console.log(movements.filter(deposit));


////////////////////////////////////////////////////////////////////////////////
//Flat and Map
///////////////////////////////////////////////////////////////////////////////
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

//Flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//flatMap
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);


////////////////////////////////////////////////////////////////////////////////
//Sorting Arrays
///////////////////////////////////////////////////////////////////////////////

//String
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

//Numbers
console.log(movements);
//return < 0, A then B (Keep Order)
//return > 0, B then A (Switch Order)

//Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

//Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
movements.sort((a, b) => b - a);

console.log(movements);
*/

////////////////////////////////////////////////////////////////////////////////
//More ways of creating and filling arrays
///////////////////////////////////////////////////////////////////////////////
// console.log([1, 2, 3, 4, 5, 6, 7]);
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

////////////////////////////////////////////////////////////////////////////////
//Array Methods Practice
///////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//Challenge 4
///////////////////////////////////////////////////////////////////////////////

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1)
dogs.forEach(function (dog, i, arr) {
  dog.reccFood = Math.trunc(dog.weight ** 0.75 * 28);
  console.log(dog.reccFood);
});

//2) helped
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.reccFood ? 'much' : 'little'
  }`
);

//3) semi helped
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.reccFood)
  .map(dog => dog.owners);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.reccFood)
  .map(dog => dog.owners);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

//4)
console.log(`${ownersEatTooMuch.flat(2).join(' and ')}'s dogs eat too much!!!`);
console.log(
  `${ownersEatTooLittle.flat(2).join(' and ')}'s dogs eat too little!!!`
);

//5
console.log(dogs.some(dog => dog.curFood === dog.reccFood));

//6
console.log(
  dogs.some(
    dog => dog.curFood > dog.reccFood * 0.9 || dog.curFood < dog.reccFood * 1.1
  )
);

//7
const ownersEatingCorrect = dogs.filter(
  dog => dog.curFood > dog.reccFood * 0.9 || dog.curFood < dog.reccFood * 1.1
);
console.log(ownersEatingCorrect, 'l');

const dogsSorted = dogs.slice().sort((a, b) => a.reccFood - b.reccFood);
console.log(dogsSorted, 's');
