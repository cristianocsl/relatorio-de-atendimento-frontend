export default function sendGreetingsMessage(): string {
  const hoursNow = new Date().getHours();

  const userName = localStorage.getItem('userName') || '' || 'Usuário(a)';

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
