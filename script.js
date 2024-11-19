document.getElementById('rsvp-form').addEventListener('submit', function (event) {
    event.preventDefault(); // מונע רענון של הדף

    const phone = document.getElementById('phone').value.trim();
    const guests = document.getElementById('guests').value.trim();
    const responseMessage = document.getElementById('response-message');

    // איפוס הודעה קיימת
    responseMessage.style.display = 'none';
    responseMessage.textContent = "";

    // בדיקת שדות
    if (!phone) {
        responseMessage.style.color = 'red';
        responseMessage.textContent = "יש להזין מספר פלאפון.";
        responseMessage.style.display = 'block';
        return;
    }

    if (!guests) {
        responseMessage.style.color = 'red';
        responseMessage.textContent = "יש להזין כמות מגיעים.";
        responseMessage.style.display = 'block';
        return;
    }

    // שליחת הנתונים ל-Google Sheets דרך ה-Web App
    fetch("https://script.google.com/macros/s/AKfycbwWSHSC0JHS4QHLe2wFTbl5qRD_T58ZlRkXDwrdd9nxzqEjUctlvfKqKEcd_LtK0NSM/exec", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `phone=${encodeURIComponent(phone)}&guests=${encodeURIComponent(guests)}`,
    })
        .then((response) => response.text())
        .then((data) => {
            if (data === "Success") {
                responseMessage.style.color = 'green';
                responseMessage.textContent = "תודה על המענה, נפגש על הרחבה!";
                responseMessage.style.display = 'block';
                // ניקוי השדות
                document.getElementById('rsvp-form').reset();
            } else {
                responseMessage.style.color = 'red';
                responseMessage.textContent = "אירעה שגיאה. נסה שוב.";
                responseMessage.style.display = 'block';
            }
        })
        .catch((error) => {
            responseMessage.style.color = 'red';
            responseMessage.textContent = "אירעה שגיאה. נסה שוב.";
            responseMessage.style.display = 'block';
            console.error('Error:', error);
        });
});


document.addEventListener("DOMContentLoaded", function() {
    confetti({
        particleCount: 200,  // כמות הנפצים
        spread: 70,          // פיזור הנפצים
        origin: { y: 0.6 },  // המיקום שממנו תצא האנימציה
        colors: ['#dab087', '#f8f0e8', '#f8f0e8', '#25180b', '#9b642f'],  // הצבעים של הנפצים
    });
});