class Pilot {
  constructor(firstName, lastName, birthday) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = new Date(birthday);
    this.flyingLicense = false;
  }

  generateLicense() {
    if (!this.flyingLicense) {
      let lastNamePart = this.lastName.toUpperCase().slice(0, 5);
      lastNamePart = lastNamePart.padEnd(5, '9');

      const year = this.birthday.getFullYear().toString();
      const decadeDigit = year[2];
      const yearDigit = year[3];
      const month = (this.birthday.getMonth() + 1).toString().padStart(2, '0');

      const firstNameInitial = this.firstName[0].toLowerCase();

      this.flyingLicense = `${lastNamePart}-${decadeDigit}${month}${yearDigit}.${firstNameInitial}`;
    }
    return this.flyingLicense;
  }
}

function aoClicar() {
  const firstName = prompt("Informe o nome:");
  if (!firstName) {
    alert("Nome é obrigatório.");
    return;
  }

  const lastName = prompt("Informe o sobrenome:");
  if (!lastName) {
    alert("Sobrenome é obrigatório.");
    return;
  }

  const birthdayInput = prompt("Informe a data de nascimento (AAAA-MM-DD):");
  const birthday = new Date(birthdayInput);
  if (isNaN(birthday.getTime())) {
    alert("Data inválida.");
    return;
  }

  const pilot = new Pilot(firstName, lastName, birthdayInput);
  const license = pilot.generateLicense();

  alert(license);
}

document.getElementById("resolver").addEventListener("click", aoClicar);



