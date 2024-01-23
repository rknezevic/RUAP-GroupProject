class UtilitiesService {
  convertAge = (ageGroup) => {
    if (ageGroup === 1) {
      return "18-";
    }
    if (ageGroup === 2) {
      return "18-23";
    }
    if (ageGroup === 3) {
      return "24-29";
    }
    if (ageGroup === 4) {
      return "30-35";
    }
    if (ageGroup === 5) {
      return "36-41";
    }
    if (ageGroup === 6) {
      return "42-47";
    }
    if (ageGroup === 7) {
      return "48-53";
    }
    if (ageGroup === 8) {
      return "54-59";
    }
    if (ageGroup === 9) {
      return "60-65";
    }
    if (ageGroup === 10) {
      return "66-71";
    }
    if (ageGroup === 11) {
      return "72-77";
    }
    if (ageGroup === 12) {
      return "78-83";
    }
    if (ageGroup === 13) {
      return "83+";
    }
  };

  convertToYesAndNo = (num) => {
    if (num == 1) return "Yes";
    return "No";
  };

  convertGeneralHealth = (generalHlth) => {
    if (generalHlth == 1) return "Excellent";
    if (generalHlth == 2) return "Very Good";
    if (generalHlth == 3) return "Good";
    if (generalHlth == 4) return "Fair";
    if (generalHlth == 5) return "Poor";
  };

  convertIncome = (income) => {
    if ((income = 1)) return "$10,000+";
    if ((income = 2)) return "$20,000+";
    if ((income = 3)) return "$30,000+";
    if ((income = 4)) return "$40,000+";
    if ((income = 5)) return "$50,000+";
    if ((income = 6)) return "$75,000+";
  };
}

export default UtilitiesService;
