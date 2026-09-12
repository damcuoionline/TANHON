export interface EventDetail {
  id: string;
  tabName?: string;
  title: string;
  subtitle: string;
  dateStr: string;
  lunarDateStr: string;
  timeStr: string;
  locationName: string;
  address: string;
  dressCodeTip?: string;
  mapEmbedUrl: string;
  googleMapsUrl: string;
  timeline: { time: string; activity: string; icon: string }[];
  calendarData: {
    title: string;
    description: string;
    location: string;
    startTime: string; // ISO format
    endTime: string;
  };
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  category: 'all' | 'prewedding' | 'studio' | 'moments';
  imageUrl: string;
  thumbnailUrl?: string;
  fallbackUrl?: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface WishMessage {
  id: string;
  name: string;
  relation: string; // 'Nhà Trai' | 'Nhà Gái' | 'Bạn Bè'
  message: string;
  date: string;
  likes: number;
}

export const WEDDING_CONFIG = {
  groom: {
    fullName: "Trương Minh Cảnh",
    shortName: "Minh Cảnh",
    role: "Chú Rể",
    title: "Groom",
    description: "Một chàng trai điềm đạm, ấm áp, luôn chu đáo và dành trọn tình yêu thương cho Thanh Nhi. Với Minh Cảnh, hạnh phúc là được thấy nụ cười của người mình yêu.",
    quote: "Gặp được em là điều may mắn nhất, và cùng em đi hết cuộc đời là ước nguyện lớn nhất của anh.",
    avatar: "/assets/gallery/2.webp",
    phone: "0979.519.585",
    facebook: "https://facebook.com",
    zalo: "https://zalo.me/0979519585",
    bank: {
      bankName: "Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)",
      accountNumber: "990123456789",
      accountHolder: "TRUONG MINH CANH",
      qrCodeUrl: "https://api.vietqr.io/image/970436-990123456789-Q4zF6gH.jpg?accountName=TRUONG%20MINH%20CANH&amount=0"
    }
  },
  bride: {
    fullName: "Nguyễn Đàm Thanh Nhi",
    shortName: "Thanh Nhi",
    role: "Cô Dâu",
    title: "Bride",
    description: "Một cô gái ngọt ngào, dịu dàng và luôn tràn đầy năng lượng tích cực. Thanh Nhi tin rằng tình yêu chân thành là sự thấu hiểu, đồng hành và cùng nhau sẻ chia mọi khoảnh khắc trong cuộc sống.",
    quote: "Cảm ơn anh vì luôn kiên nhẫn, yêu thương và biến những điều bình thường của em thành những điều đặc biệt.",
    avatar: "/assets/gallery/3.webp",
    phone: "0357.695.265",
    facebook: "https://facebook.com",
    zalo: "https://zalo.me/0357695265",
    bank: {
      bankName: "Ngân hàng Quân Đội (MB Bank)",
      accountNumber: "090987654321",
      accountHolder: "NGUYEN DAM THANH NHI",
      qrCodeUrl: "https://api.vietqr.io/image/970422-090987654321-Q4zF6gH.jpg?accountName=NGUYEN%20DAM%20THANH%20NHI&amount=0"
    }
  },
  weddingDate: "2026-10-04T09:00:00+07:00", // Ngày Thành Hôn: 04/10/2026
  weddingDateReception: "2026-10-04T18:00:00+07:00",
  dateFormatted: "Chủ Nhật, 04 Tháng 10 Năm 2026",
  lunarDateFormatted: "24 Tháng 08 Năm Bính Ngọ",
  googleDriveUrl: "https://drive.google.com/drive/folders/1zNxSGVaIqAS8SGRgT1xuTfpWTSw1iVSW?usp=sharing",
  bgImage: "/assets/aistudio/hero_bg_clean.webp",
  heroImage: "/assets/aistudio/hero_bg_clean.webp",
  coupleCoverImage: "/assets/aistudio/hero_bg_clean.webp",
};

export const STORY_MILESTONES: StoryMilestone[] = [
  {
    year: "10/2021",
    tag: "Lần Đầu Chạm Mặt",
    title: "Ánh nhìn đầu tiên định mệnh",
    description: "Một buổi chiều thu dịu mát tại quán cà phê quen thuộc. Cuộc gặp gỡ tình cờ qua một người bạn chung đã mở ra cuộc trò chuyện kéo dài hàng giờ mà không ai muốn dừng lại.",
    image: "/assets/gallery/2.webp"
  },
  {
    year: "02/2022",
    tag: "Lời Tỏ Tình Ngọt Ngào",
    title: "Anh muốn làm người che chở em",
    description: "Dưới ánh đèn lung linh của đêm Valentine bên bờ sông Sài Gòn, Minh Cảnh đã gom hết can đảm trao bó hoa hồng dịu dàng với lời hẹn ước: 'Em làm người yêu anh nhé?'. Thanh Nhi đã mỉm cười gật đầu.",
    image: "/assets/gallery/5.webp"
  },
  {
    year: "2023 - 2024",
    tag: "Hành Trình Gắn Kết",
    title: "Cùng nhau đi khắp muôn nơi",
    description: "Từ những con dốc Đà Lạt, biển xanh Phú Quốc đến những chuyến phượt miền Trung nắng gió. Từng chuyến đi giúp hai đứa thêm thấu hiểu, cảm thông và sẻ chia mọi gia vị cuộc sống.",
    image: "/assets/gallery/15.webp"
  },
  {
    year: "12/2025",
    tag: "Khoảnh Khắc Cầu Hôn",
    title: "“Yes, I Do!” - Lời hẹn trăm năm",
    description: "Trong chuyến du lịch hoàng hôn lãng mạn, Minh Cảnh quỳ xuống với chiếc nhẫn cưới trên tay. Nụ cười rạng rỡ và giọt nước mắt hạnh phúc của Thanh Nhi đã biến khoảnh khắc ấy thành vĩnh cửu.",
    image: "/assets/gallery/DSC00190.webp"
  },
  {
    year: "04/10/2026",
    tag: "Ngày Chung Đôi",
    title: "Về chung một mái nhà",
    description: "Trang mới của tình yêu chính thức mở ra. Minh Cảnh & Thanh Nhi hân hoan bước vào ngày trọng đại nhất cuộc đời trong sự chúc phúc của gia đình và bạn bè thân thương.",
    image: "/assets/gallery/DSC00591.webp"
  }
];

export const WEDDING_EVENTS: EventDetail[] = [
  {
    id: "dem-nhom-ho",
    tabName: "Đêm Nhóm Họ",
    title: "TIỆC ĐÊM NHÓM HỌ (TƯ GIA NHÀ TRAI)",
    subtitle: "Gặp Mặt Thân Mật Gia Đình & Bạn Bè",
    dateStr: "Thứ Bảy, Ngày 03 Tháng 10 Năm 2026",
    lunarDateStr: "Nhằm ngày 23 Tháng 08 Năm Bính Ngọ",
    timeStr: "17:30 Chiều Tối",
    locationName: "Tư Gia Nhà Trai",
    address: "Đường Đồng Khởi, Khu phố Ninh Phước, thị trấn Lộc Ninh, huyện Lộc Ninh, tỉnh Bình Phước",
    dressCodeTip: "Trang phục tự do, thanh lịch, thoải mái & tươi sáng",
    mapEmbedUrl: "https://maps.google.com/maps?q=11.846989,106.591518&t=&z=16&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl: "https://maps.app.goo.gl/iPEx8zfrtJwZuSFt8",
    timeline: [
      { time: "17:00", activity: "Đón tiếp bà con dòng họ, láng giềng & bạn bè thân thương", icon: "Car" },
      { time: "17:30", activity: "Khai tiệc liên hoan ấm cúng đêm nhóm họ", icon: "Utensils" },
      { time: "19:00", activity: "Giao lưu văn nghệ, chuyện trò rộn rã ấm tình thân gia đình", icon: "Sparkles" },
      { time: "21:00", activity: "Hàn huyên, chúc phúc & chuẩn bị cho ngày hôn lễ trọng đại", icon: "Heart" }
    ],
    calendarData: {
      title: "Tiệc Đêm Nhóm Họ: Tư Gia Nhà Trai - Minh Cảnh & Thanh Nhi",
      description: "Tiệc liên hoan họp mặt đêm nhóm họ ấm cúng tại Tư Gia Nhà Trai (Đường Đồng Khởi, KP. Ninh Phước, TT. Lộc Ninh, Bình Phước). Trân trọng kính mời quý khách!",
      location: "Tư Gia Nhà Trai, Đường Đồng Khởi, KP. Ninh Phước, TT. Lộc Ninh, tỉnh Bình Phước",
      startTime: "20261003T103000Z", // 17:30 UTC+7 is 10:30 UTC
      endTime: "20261003T150000Z"
    }
  },
  {
    id: "le-thanh-hon",
    tabName: "Lễ Thành Hôn",
    title: "LỄ THÀNH HÔN (TƯ GIA NHÀ TRAI)",
    subtitle: "Nghi Lễ Gia Tiên & Thành Hôn Trang Trọng",
    dateStr: "Chủ Nhật, Ngày 04 Tháng 10 Năm 2026",
    lunarDateStr: "Nhằm ngày 24 Tháng 08 Năm Bính Ngọ",
    timeStr: "09:00 Sáng",
    locationName: "Tư Gia Nhà Trai",
    address: "Đường Đồng Khởi, Khu phố Ninh Phước, thị trấn Lộc Ninh, huyện Lộc Ninh, tỉnh Bình Phước",
    dressCodeTip: "Áo dài truyền thống, trang phục lịch sự trang nhã (Tone Trắng Kem / Vàng Nhạt / Pastel)",
    mapEmbedUrl: "https://maps.google.com/maps?q=11.846989,106.591518&t=&z=16&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl: "https://maps.app.goo.gl/iPEx8zfrtJwZuSFt8",
    timeline: [
      { time: "08:30", activity: "Đón tiếp hai họ, gia đình & người thân chuẩn bị nghi lễ tại Tư Gia Nhà Trai", icon: "Car" },
      { time: "09:00", activity: "Nghi thức trao tráp dâu rể & chào hỏi hai họ", icon: "Gift" },
      { time: "09:30", activity: "Lễ dâng hương gia tiên & trao nhẫn cưới thiêng liêng", icon: "Heart" },
      { time: "10:15", activity: "Chụp ảnh lưu niệm cùng gia đình, họ hàng & bạn bè thân hữu", icon: "Camera" },
      { time: "10:45", activity: "Chuẩn bị di chuyển đến Trung Tâm Tiệc Cưới Minh Hiếu dự tiệc mừng", icon: "Car" }
    ],
    calendarData: {
      title: "Lễ Thành Hôn: Trương Minh Cảnh & Nguyễn Đàm Thanh Nhi (Tư Gia Nhà Trai)",
      description: "Lễ Thành Hôn cử hành trang trọng tại Tư Gia Nhà Trai (Đường Đồng Khởi, KP. Ninh Phước, TT. Lộc Ninh, tỉnh Bình Phước). Trân trọng kính mời quý khách!",
      location: "Tư Gia Nhà Trai, Đường Đồng Khởi, KP. Ninh Phước, TT. Lộc Ninh, tỉnh Bình Phước",
      startTime: "20261004T020000Z", // 09:00 UTC+7 is 02:00 UTC
      endTime: "20261004T050000Z"
    }
  },
  {
    id: "tiec-thanh-hon",
    tabName: "Tiệc Mừng Thành Hôn",
    title: "TIỆC MỪNG THÀNH HÔN",
    subtitle: "Dạ Tiệc Mừng Hạnh Phúc Trăm Năm",
    dateStr: "Chủ Nhật, Ngày 04 Tháng 10 Năm 2026",
    lunarDateStr: "Nhằm ngày 24 Tháng 08 Năm Bính Ngọ",
    timeStr: "11:00 Trưa (Đón khách: 10:30)",
    locationName: "Trung Tâm Sự Kiện Tiệc Cưới Minh Hiếu",
    address: "19 Cách Mạng Tháng Tám, KP. Ninh Thịnh, TT. Lộc Ninh, huyện Lộc Ninh, tỉnh Bình Phước",
    dressCodeTip: "Tone màu Vàng Kim (Champagne Gold), Trắng Kem, Hồng Pastel hoặc Xanh Nhạt",
    mapEmbedUrl: "https://maps.google.com/maps?q=Trung+T%C3%A2m+S%E1%BB%B1+Ki%E1%BB%87n+Ti%E1%BB%87c+C%C6%B0%E1%BB%9Bi+Minh+Hi%E1%BA%BFu,+L%E1%BB%99c+Ninh&t=&z=16&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl: "https://maps.app.goo.gl/xN1uYHbiC6mHURPu8",
    timeline: [
      { time: "10:30", activity: "Đón tiếp quan khách & Chụp ảnh lưu niệm cùng Cô Dâu - Chú Rể", icon: "Camera" },
      { time: "11:15", activity: "Nghi lễ cắt bánh cưới, cảm ơn tri ân sinh thành dưỡng dục cha mẹ", icon: "Heart" },
      { time: "11:30", activity: "Khai tiệc mừng Thành Hôn & Giao lưu văn nghệ cùng gia đình", icon: "Utensils" },
      { time: "12:45", activity: "Cảm ơn quý quan khách & Tiễn khách thân tình", icon: "Sparkles" }
    ],
    calendarData: {
      title: "Tiệc Mừng Thành Hôn: Minh Cảnh & Thanh Nhi",
      description: "Tiệc cưới thân mật mừng Thành Hôn tại Trung Tâm Sự Kiện Tiệc Cưới Minh Hiếu (19 Cách Mạng Tháng Tám, TT. Lộc Ninh, tỉnh Bình Phước).",
      location: "Trung Tâm Sự Kiện Tiệc Cưới Minh Hiếu, 19 Cách Mạng Tháng Tám, TT. Lộc Ninh, tỉnh Bình Phước",
      startTime: "20261004T033000Z", // 10:30 UTC+7 is 03:30 UTC
      endTime: "20261004T073000Z"
    }
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "p1",
    title: "Vest Cưới Lịch Lãm",
    caption: "Minh Cảnh trong bộ vest xanh đen trang trọng cùng Thanh Nhi kiêu sa trong váy cưới trắng tinh khôi.",
    category: "studio",
    imageUrl: "/assets/gallery/DSC00591.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00591.webp"
  },
  {
    id: "p2",
    title: "Nghi Thức Trao Nhẫn Cưới",
    caption: "Giây phút thiêng liêng khi trao nhau chiếc nhẫn đính ước trăm năm trong tà áo dài đỏ truyền thống.",
    category: "moments",
    imageUrl: "/assets/gallery/DSC06745.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC06745.webp"
  },
  {
    id: "p3",
    title: "Nắm Tay Đi Qua Năm Tháng",
    caption: "Đôi bàn tay ấm áp đan chặt trong trang phục áo dài truyền thống ngày đại hỷ.",
    category: "moments",
    imageUrl: "/assets/gallery/DSC07053.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC07053.webp"
  },
  {
    id: "p4",
    title: "Tình Nồng Son Sắt (Vest Cưới)",
    caption: "Chú rể mặc vest sọc phong độ, cô dâu diện váy cưới cúp ngực dịu dàng ôm chú rể từ phía sau.",
    category: "studio",
    imageUrl: "/assets/gallery/DSC09855.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC09855.webp"
  },
  {
    id: "p5",
    title: "Khoe Nhẫn Cưới Hạnh Phúc",
    caption: "Nụ cười rạng ngời và khoảnh khắc khoe cặp nhẫn cưới thiêng liêng đầy tự hào.",
    category: "moments",
    imageUrl: "/assets/gallery/DSC00190.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00190.webp"
  },
  {
    id: "p6",
    title: "Nụ Hôn Yêu Thương Lên Bàn Tay",
    caption: "Chú rể nâng niu và dịu dàng đặt nụ hôn trân trọng lên bàn tay người bạn đời.",
    category: "moments",
    imageUrl: "/assets/gallery/DSC00174.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00174.webp"
  },
  {
    id: "p7",
    title: "Sánh Bước Chung Đôi",
    caption: "Nụ cười rạng rỡ của Minh Cảnh & Thanh Nhi trong trang phục vest cưới sang trọng tại studio.",
    category: "studio",
    imageUrl: "/assets/gallery/DSC09895.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC09895.webp"
  },
  {
    id: "p8",
    title: "Tay Trong Tay Bình Yên",
    caption: "Nắm chặt tay nhau, cùng hướng về một tương lai ngập tràn niềm vui và ấm áp.",
    category: "moments",
    imageUrl: "/assets/gallery/DSC00130_phong.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00130%20phong.webp"
  },
  {
    id: "p9",
    title: "Ánh Mắt Yêu Thương",
    caption: "Chú rể trong bộ vest lịch lãm trao ánh nhìn âu yếm cho cô dâu Thanh Nhi xinh đẹp.",
    category: "studio",
    imageUrl: "/assets/gallery/DSC09904.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC09904.webp"
  },
  {
    id: "p10",
    title: "Nàng Dâu Kiêu Sa",
    caption: "Vẻ đẹp kiêu sa và nụ cười ngập tràn hạnh phúc của cô dâu trong chiếc váy cưới lộng lẫy.",
    category: "studio",
    imageUrl: "/assets/gallery/DSC00438.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00438.webp"
  },
  {
    id: "p11",
    title: "Duyên Tình Trăm Năm (Vest Cưới)",
    caption: "Bộ vest cưới trang nhã cùng váy cưới thướt tha hòa quyện tạo nên bức họa tình yêu tuyệt mỹ.",
    category: "studio",
    imageUrl: "/assets/gallery/DSC00553.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00553.webp"
  },
  {
    id: "p12",
    title: "Nguyện Ước Sánh Đôi (Nắm Tay)",
    caption: "Bàn tay ấm chở che, cùng nhau bước trên con đường đắp xây tổ ấm trăm năm.",
    category: "moments",
    imageUrl: "/assets/gallery/4.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/4.png"
  },
  {
    id: "p13",
    title: "Bản Tình Ca Hạnh Phúc",
    caption: "Khoảnh khắc ngọt ngào bên nhau, khắc sâu từng phút giây son sắt của tuổi trẻ.",
    category: "studio",
    imageUrl: "/assets/gallery/DSC09963.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC09963.webp"
  },
  {
    id: "p14",
    title: "Phong Cách Cưới Hoàng Gia",
    caption: "Bức ảnh cưới studio tân cổ điển sang trọng lưu giữ tình yêu vĩnh cửu.",
    category: "studio",
    imageUrl: "/assets/gallery/DSC09971_phong.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC09971%20phong.webp"
  },
  {
    id: "p15",
    title: "Kỷ Niệm Ngày Trọng Đại",
    caption: "Minh Cảnh & Thanh Nhi rạng rỡ trong bức ảnh kỷ niệm ngày hôn lễ thiêng liêng.",
    category: "prewedding",
    imageUrl: "/assets/gallery/1.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/1.png"
  },
  {
    id: "p16",
    title: "Tình Yêu & Niềm Tin Son Sắt",
    caption: "Cái nắm tay ấm áp và nụ cười rạng rỡ bên nhau trong buổi chụp ảnh kỷ niệm.",
    category: "prewedding",
    imageUrl: "/assets/gallery/DSC00280.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00280.webp"
  },
  {
    id: "p17",
    title: "Nụ Cười Rạng Rỡ",
    caption: "Một niềm hạnh phúc giản đơn ngập tràn trong ánh mắt người thương.",
    category: "prewedding",
    imageUrl: "/assets/gallery/3.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/3.png"
  },
  {
    id: "p18",
    title: "Ngọt Ngào Tình Đôi Ta",
    caption: "Chỉ cần bên nhau, mọi phút giây thường nhật đều hóa thành kỷ niệm tươi đẹp.",
    category: "prewedding",
    imageUrl: "/assets/gallery/5.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/5.png"
  },
  {
    id: "p19",
    title: "Nàng Dâu Dịu Dàng Thanh Nhi",
    caption: "Vẻ đẹp thuần khiết, dịu dàng và rạng ngời của Thanh Nhi trong ngày chung đôi.",
    category: "studio",
    imageUrl: "/assets/gallery/7.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/7.png"
  },
  {
    id: "p20",
    title: "Trọn Đời Gắn Bó",
    caption: "Minh Cảnh & Thanh Nhi – Tình yêu son sắt, trọn đời gắn bó thủy chung bên nhau.",
    category: "prewedding",
    imageUrl: "/assets/gallery/16.webp",
    fallbackUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/16.png"
  }
];

export const INITIAL_WISHES: WishMessage[] = [
  {
    id: "w1",
    name: "Gia đình Bác Hai",
    relation: "Nhà Trai",
    message: "Chúc hai cháu Minh Cảnh và Thanh Nhi trăm năm hạnh phúc, răng long đầu bạc, luôn yêu thương và thấu hiểu nhau trong mọi chặng đường!",
    date: "10 phút trước",
    likes: 12
  },
  {
    id: "w2",
    name: "Hoàng Yến (Bạn thân cô dâu)",
    relation: "Nhà Gái",
    message: "Cuối cùng ngày này cũng tới rồi Nhi ơiii! Chúc cô dâu xinh đẹp nhất trần đời mãi hạnh phúc bên nhau nhé. Chờ quẩy tung nóc nha!",
    date: "25 phút trước",
    likes: 18
  },
  {
    id: "w3",
    name: "Nhóm Bạn Đại Học Bách Khoa",
    relation: "Bạn Bè",
    message: "Chúc mừng người anh em Cảnh chính thức 'chống lầy'! Chúc hai bạn sớm thêm thiên thần nhỏ đáng yêu nha!",
    date: "1 giờ trước",
    likes: 9
  }
];

export const FAQ_LIST = [
  {
    question: "Trang Phục Dự Tiệc (Dress Code) như thế nào?",
    answer: "Minh Cảnh & Thanh Nhi gợi ý quý khách có thể chọn trang phục lịch thiệp với tone màu chủ đạo: Xanh Ngọc (Emerald), Vàng Kim (Champagne Gold), Trắng Kem hoặc gam màu Pastel nhẹ nhàng để những bức hình kỷ niệm thêm phần lung linh."
  },
  {
    question: "Có chỗ đậu xe ô tô và xe máy không?",
    answer: "Dạ có ạ! Cả tại Tư Gia Nhà Trai (Đường Đồng Khởi, KP. Ninh Phước, TT. Lộc Ninh) trong Đêm Nhóm Họ & Lễ Thành Hôn và Trung Tâm Sự Kiện Tiệc Cưới Minh Hiếu (19 Cách Mạng Tháng Tám, TT. Lộc Ninh) trong ngày Lễ & Tiệc đều có không gian bãi đậu xe ô tô và xe máy rộng rãi, có người hướng dẫn chu đáo và hoàn toàn miễn phí cho quý khách."
  },
  {
    question: "Tôi có thể dẫn theo người thân hoặc trẻ em không?",
    answer: "Minh Cảnh & Thanh Nhi vô cùng hoan nghênh quý khách đi cùng người thương và các bé. Xin quý khách vui lòng ghi chú số lượng người tham dự trong mục Đăng Ký (RSVP) để chúng mình chuẩn bị đón tiếp chu đáo nhất nhé!"
  },
  {
    question: "Tôi ăn kiêng / ăn chay thì làm sao?",
    answer: "Trong form RSVP, bạn có thể chọn hoặc ghi chú phần ăn chay hoặc dị ứng thực phẩm. Nhà hàng sẽ chuẩn bị riêng thực đơn chay thanh đạm, cao cấp dành riêng cho bạn."
  },
  {
    question: "Nếu không thể tham dự trực tiếp, tôi gửi lời chúc mừng bằng cách nào?",
    answer: "Nếu bận hoặc ở xa, bạn có thể gửi lời chúc mừng và tình cảm yêu thương tại mục 'Sổ Lưu Bút & Gửi Lời Chúc Online' hoặc qua form Đăng Ký (RSVP). Sự hiện diện hay lời chúc phúc của quý khách dù gần hay xa đều là món quà quý giá đối với gia đình chúng tôi."
  }
];

export const MUSIC_PLAYLIST = [
  {
    title: "Until I Found You (Piano & Cello Romantic)",
    artist: "Stephen Sanchez (Wedding Instrumental)",
    src: "https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg"
  },
  {
    title: "Canon in D Major (Wedding Classic)",
    artist: "Johann Pachelbel",
    src: "https://actions.google.com/sounds/v1/ambiences/gentle_stream.ogg"
  },
  {
    title: "A Thousand Years (Acoustic Strings)",
    artist: "Christina Perri",
    src: "https://actions.google.com/sounds/v1/ambiences/soft_breeze.ogg"
  }
];
