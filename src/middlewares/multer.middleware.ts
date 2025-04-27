import multer, { StorageEngine, FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

// 📂 Fayllar qayerga saqlanadi
const storage: StorageEngine = multer.diskStorage({
	destination: function (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null, destination: string) => void
	) {
		cb(null, path.join(process.cwd(), "uploads"));
	},
	filename: function (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null, filename: string) => void
	) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const ext = path.extname(file.originalname);
		cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
	},
});

// 📌 Faqat rasm fayllarini qabul qilish
const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback
) => {
	const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true); // ✅ Ruxsat beriladi
	} else {
		cb(new Error("Faqat JPG, JPEG va PNG fayllar yuklash mumkin!")); // ❌ Error qaytariladi
	}
};

// 📏 Maksimal fayl hajmini belgilash (masalan, 5MB)
const limits = {
	fileSize: 5 * 1024 * 1024, // 5 MB
};

// 🔥 Yakuniy multer instance
const upload = multer({
	storage,
	fileFilter,
	limits,
});

export default upload;
