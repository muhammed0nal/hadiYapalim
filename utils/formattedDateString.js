export function formatDate(dateStr, splitType) {
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  // Tarihi parçalarına ayır
  const [year, month, day] = dateStr.split(splitType).map(Number);

  // Ayı ay adlarına çevir
  const monthName = months[month - 1];

  // Formatlanmış tarihi döndür
  return `${day} ${monthName} ${year}`;
}
