export default function sendGreetingsMessage(): string | undefined {
  const hoursNow = new Date().getHours();

  try {
    const userNameJson = localStorage.getItem('userName') || '';
    const userName = JSON.parse(userNameJson);
  
    if (hoursNow >= 0 && hoursNow < 12) {
      return `Bom dia, ${userName}!`
    }
    if (hoursNow >= 12 && hoursNow < 18) {
      return `Boa tarde, ${userName}!`
    }
    else {
      return `Boa noite, ${userName}!`
    }
  } catch (err) {
    console.log(err);
  }

}
