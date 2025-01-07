const loader = document.querySelector(".loader");
const text = document.querySelector(".text");
const checkmark = document.querySelector(".checkmark");

const rateElement = document.getElementById("rate");
const usdInput = document.getElementById("usdInput");
const convertBtn = document.getElementById("convertBtn");
const resultElement = document.getElementById("result");

// valuta kursini olish funksiyasi..
async function fetchRate() {
    try {
        const response = await fetch("https://cbu.uz/uzc/arkhiv-kursov-valyut/json/");
        const data = await response.json();
        const usdRate = data.find(item => item.Ccy === "USD").Rate;
        rateElement.textContent = `Dollar kursi: ${usdRate} So'm `;
        return parseFloat(usdRate);

    } catch (error) {
        rateElement.textContent = "Kursni olishda xatolik yuz berdi!"
        console.log(error);
    }


}

// Konvertatsiya qilish funksiyasi
async function convert() {
    const usdRate = await fetchRate();
    const usdValue = parseFloat(usdInput.value);

    if (isNaN(usdValue) || usdValue <= 0) {
        resultElement.textContent = "Iltimos to'g'ri miqdor kiriting!";
        return;
    }

    const uzsValue = usdValue * usdRate;
    resultElement.textContent = `Natija: ${uzsValue.toFixed(2)} so'm`;
}

// Tugmani bosganda hisoblash
convertBtn.addEventListener("click", convert);

// Sayt yuklanganda kursni ko'rsatish
fetchRate();



// Loaderni oshirish
convertBtn.addEventListener("click", () => {
    // Loader va matnni boshqarish
    loader.style.display = "block";
    text.style.display = "none";

    // 2 soniyadan keyin galochka belgisini ko‘rsatish
    setTimeout(() => {
        loader.style.display = "none";
        checkmark.style.display = "block";

        // 1 soniyadan keyin reset qilish
        setTimeout(() => {
            checkmark.style.display = "none";
            text.style.display = "block";
        }, 1000);
    }, 2000);
});