// yup
import * as yup from "yup";
export const validationSchemaRegister = yup.object().shape({
  name: yup.string().trim().required("Ad gerekli"),
  surname: yup.string().trim().required("Soyisim gerekli"),
  username: yup
    .string()
    .trim()
    .matches(/^(?!.*\s).*$/, "Kullanıcı adı boşluk içeremez")
    .required("Kullanıcı adı gerekli."),
  email: yup
    .string()
    .trim()
    .email("Geçersiz email")
    .matches(/^(?!.*\s).*$/, "Email boşluk içeremez")
    .matches(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|icloud\.com|outlook\.com)$/, // Bu regex, sadece gmail, icloud ve outlook e-posta adreslerini kabul eder
      "Geçersiz email (gmail, icloud, outlook)"
    )
    .required("Email gerekli"),
  telNo: yup
    .string()
    .trim()
    .matches(/^[0-9]+$/, "Telefon numarası yalnızca rakamlardan oluşmalıdır")
    .required("Telefon numarası gerekli")
    .matches(/^(?!.*\s).*$/, "Telefon numarası boşluk içeremez"),
  picker: yup.string().required("Cinsiyet seçimi gerekli"),
  password: yup
    .string()
    .trim()
    .required("Şifre gerekli")
    .matches(/^(?!.*\s).*$/, "Şifre boşluk içeremez")
    .min(8, "Şifre en az 6 karakter olmalı")
    .max(20, "Şifre en fazla 20 karakter olmalıdır.")
    .matches(/[a-zA-Z]/, "Şifrede en az bir küçük harf olmalı") // Bu regex tüm İngilizce ve Türkçe harfleri kapsar
    .matches(/[A-ZİIŞĞÜÖÇ]/, "Şifrede en az bir büyük harf olmalı") // Türkçe büyük harfleri ekledik
    .matches(/[0-9]/, "Şifrede en az bir rakam olmalı")
    .matches(
      /.*[?_.*].*/,
      "Şifrede en az bir özel karakter olmalı (?) (_) (.) (*)"
    ),
  password_2: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), null], "Şifreler uyuşmuyor")
    .required("Şifre tekrarı gerekli"),
  isChecked: yup
    .boolean()
    .oneOf([true], "Aydınlatma metnini onaylamalısınız")
    .required("Onay kutusu gereklidir"),
});

export const validationSchemaLogin = yup.object().shape({
  emailorUsername: yup
    .string()
    .trim()
    .required("Email veya kullanıcı adı gerekli"),
  password: yup.string().trim().required("Şifre gerekli"),
});

export const validationSchemaAddPost = yup.object().shape({
  title: yup
    .string()
    .required("Başlık zorunludur.")
    .min(3, "Başlık en az 3 karakter olmalıdır.")
    .max(50, "Başlık en fazla 50 karakter olabilir."),
  description: yup
    .string()
    .required("Açıklama zorunludur.")
    .min(10, "Açıklama en az 10 karakter olmalıdır.")
    .max(500, "Açıklama en fazla 500 karakter olabilir."),
});
