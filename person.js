let killed = 0;
let stop = false;

let balance;

let bullet = Math.floor(Math.random() * 6) + 1;
console.log("Bullet is in chamber:", bullet);

const bet = document.getElementById("bet");
let elem = document.getElementsByTagName("video");
let balanceText = document.getElementById("balance")

if (localStorage.getItem("balance") !== null) {
    balance = parseInt(localStorage.getItem("balance"));
} else {
    balance = parseInt(balanceText.innerText);
    localStorage.setItem("balance", balance);
}

balanceText.innerHTML = balance

window.onload = () => {
    elem[0].play()
}

function waitForVideoToEnd(video) {
    return new Promise(resolve => {
        video.onended = () => {
            resolve();
        };
    });
}

let turn = Math.floor(Math.random() * 2)

bet.addEventListener("click", () => {
    const userChoice = document.querySelector("input[name='person']:checked").value;
    
    let amount = document.getElementById("amount").value;
    amount = parseInt(amount);
    console.log(amount);
    
    if(isNaN(amount)){
        alert("Please enter an amount")
        return
    }

    if(amount > balance){
        alert("insuffecient balance")
        return
    } else {
        balance -= amount
        balanceText.innerHTML = balance
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function playSequence(bullet, elem) {
        let killed = 0;

        for (let i = 1; i <= 6; i++) {
            console.log("Round:", i);

            if (turn == 0) {
                if (i === bullet) {
                    elem[0].src = "videos/Kill1.mp4";
                    setTimeout(() => {
                        elem[0].play();
                    }, 2000);
                    await waitForVideoToEnd(elem[0]);
                    killed = 1;
                    break;
                } else {
                    elem[0].src = "videos/Dry1.mp4";
                    setTimeout(() => {
                        elem[0].play();
                    }, 2000);
                    await waitForVideoToEnd(elem[0]);
                }
            } 
            
            if(turn == 1){
                if (i === bullet) {
                    elem[0].src = "videos/Kill2.mp4";
                    setTimeout(() => {
                        elem[0].play();
                    }, 2000);
                    await waitForVideoToEnd(elem[0]);
                    killed = 2;
                    break;
                    
                } else {
                    elem[0].src = "videos/Dry2.mp4";
                    setTimeout(() => {
                        elem[0].play();
                    }, 2000);
                    await waitForVideoToEnd(elem[0]);
                }
            }

            if(turn == 0){
                turn = 1
            } else {
                turn = 0
            }

            await delay(5000);
        }

        let result = document.getElementById("result");
        bet.innerHTML = "Try again"

        if (userChoice == killed) {
            console.log("You won");
            result.innerHTML = `You Won<br>${amount} x 2: ${amount*2}rs 🤑`;
            result.style.color = "green";

            let newAmount = amount * 2
            balance += newAmount
            balanceText.innerHTML = balance
        } else {
            console.log("You lost");
            result.innerHTML = "You Lost! 🤣";
            result.style.color = "red";
        }

        localStorage.setItem("balance", balance)

        bet.addEventListener("click", () => {
            location.reload()
        })
    }

    playSequence(bullet, elem);
});
