export default function sendGreetingsMessage(): string | undefined {
  const hoursNow = new Date().getHours();

  const userNameJson = localStorage.getItem('userName') || '';
  const userName = JSON.parse(userNameJson).toString();

  if (hoursNow >= 0 && hoursNow < 12) {
    return `Bom dia, ${userName}!`
  }
  if (hoursNow >= 12 && hoursNow < 18) {
    return `Boa tarde, ${userName}!`
  }
  else {
    return `Boa noite, ${userName}!`
  }
}
