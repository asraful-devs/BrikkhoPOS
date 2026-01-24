# BrikkhoPOS Client Site - Setup Guide

এই ডকুমেন্টেশনে ক্লাইন্ট সাইটের নতুন ফিচারগুলো কিভাবে ব্যবহার করবেন তা বর্ণনা করা হয়েছে।

## নতুন ফিচার সমূহ

### 1. শ্রমিক ব্যবস্থাপনা (Worker Management)
- ✅ নতুন শ্রমিক তৈরি
- ✅ শ্রমিক তালিকা দেখা (সার্চ সহ)
- ✅ শ্রমিক তথ্য আপডেট
- ✅ শ্রমিক নিষ্ক্রিয় করা (Soft Delete)
- ✅ শ্রমিক মুছে ফেলা (Permanent Delete)
- ✅ শ্রমিক বিস্তারিত দেখা

### 2. হাজিরা ব্যবস্থাপনা (Attendance Management)
- ✅ দৈনিক হাজিরা এন্ট্রি
- ✅ হাজিরা তালিকা দেখা
- ✅ হাজিরা আপডেট
- ✅ হাজিরা মুছে ফেলা

### 3. সাপ্তাহিক সারাংশ (Weekly Summary)
- ✅ সাপ্তাহিক সারাংশ তৈরি
- ✅ সারাংশ তালিকা দেখা
- ✅ সারাংশ বিস্তারিত দেখা
- ✅ পরিশোধিত হিসেবে চিহ্নিত করা
- ✅ সাপ্তাহিক রিপোর্ট জেনারেট

### 4. বেতন সমন্বয় (Salary Adjustment)
- ✅ বোনাস/ওভারটাইম/কর্তন/অগ্রিম যোগ
- ✅ সমন্বয় তালিকা দেখা
- ✅ সমন্বয় মুছে ফেলা

---

## সেটআপ নির্দেশিকা

### প্রয়োজনীয় Dependencies ইনস্টল

```bash
cd "BrikkhoPOS Client Site"
npm install
```

নতুন যোগ করা dependencies:
- `@radix-ui/react-select`
- `@radix-ui/react-alert-dialog`
- `@radix-ui/react-checkbox`

### Environment Variables

`.env` ফাইলে নিম্নলিখিত ভেরিয়েবল যোগ করুন:

```env
VITE_BASE_URL=http://localhost:5000/api
```

### Development Server চালু করুন

```bash
npm run dev
```

---

## ফাইল স্ট্রাকচার

```
src/
├── redux/features/
│   ├── auth/                    # Authentication API (আগে থেকে আছে)
│   ├── worker/
│   │   └── worker.api.ts        # Worker CRUD API
│   ├── attendance/
│   │   └── attendance.api.ts    # Attendance CRUD API
│   ├── salaryAdjustment/
│   │   └── salaryAdjustment.api.ts
│   └── weeklySummary/
│       └── weeklySummary.api.ts
├── zod/
│   ├── auth.zod.ts              # Auth validations (আগে থেকে আছে)
│   ├── worker.zod.ts            # Worker form validations
│   ├── attendance.zod.ts        # Attendance form validations
│   ├── salaryAdjustment.zod.ts
│   └── weeklySummary.zod.ts
├── types/
│   ├── index.ts                 # Common types (আগে থেকে আছে)
│   ├── worker.types.ts          # Worker interfaces
│   ├── attendance.types.ts
│   ├── salaryAdjustment.types.ts
│   └── weeklySummary.types.ts
├── components/ui/
│   ├── table.tsx                # Data table component
│   ├── select.tsx               # Dropdown select
│   ├── card.tsx                 # Card container
│   ├── badge.tsx                # Status badges
│   ├── alert-dialog.tsx         # Confirmation dialogs
│   ├── checkbox.tsx             # Checkbox input
│   └── ...                      # Others (আগে থেকে আছে)
├── modules/dashboard/admin/
│   ├── worker/
│   │   ├── CreateWorkerForm.tsx
│   │   ├── WorkerList.tsx
│   │   ├── EditWorkerForm.tsx
│   │   └── WorkerDetails.tsx
│   ├── attendance/
│   │   ├── CreateAttendance.tsx
│   │   ├── AttendanceList.tsx
│   │   └── EditAttendance.tsx
│   ├── weeklySummary/
│   │   ├── CreateWeeklySummary.tsx
│   │   ├── WeeklySummaryList.tsx
│   │   ├── WeeklySummaryDetails.tsx
│   │   └── WeeklyReport.tsx
│   └── salaryAdjustment/
│       ├── CreateSalaryAdjustment.tsx
│       └── SalaryAdjustmentList.tsx
└── routers/
    ├── adminSitebarItems.tsx    # Admin sidebar routes (আপডেটকৃত)
    └── router.tsx               # Main router (আপডেটকৃত)
```

---

## API Endpoints (Server Side)

| Module | Method | Endpoint |
|--------|--------|----------|
| Worker | POST | `/worker/create-worker` |
| Worker | GET | `/worker/get-workers` |
| Worker | GET | `/worker/get-single-worker/:id` |
| Worker | PATCH | `/worker/update-worker/:id` |
| Worker | PATCH | `/worker/soft-delete-worker/:id` |
| Worker | DELETE | `/worker/delete-worker/:id` |
| Attendance | POST | `/attendance/create-attendance` |
| Attendance | GET | `/attendance/get-attendances` |
| Attendance | GET | `/attendance/get-single-attendance/:id` |
| Attendance | PATCH | `/attendance/update-attendance/:id` |
| Attendance | DELETE | `/attendance/delete-attendance/:id` |
| Weekly Summary | POST | `/weekly-summary/create-weekly-summary` |
| Weekly Summary | GET | `/weekly-summary/get-weekly-summaries` |
| Weekly Summary | GET | `/weekly-summary/get-single-weekly-summary/:id` |
| Weekly Summary | PATCH | `/weekly-summary/update-weekly-summary/:id` |
| Weekly Summary | DELETE | `/weekly-summary/delete-weekly-summary/:id` |
| Weekly Summary | POST | `/weekly-summary/weekly-report` |
| Salary Adjustment | POST | `/salary-adjustment/create-salary-adjustment` |
| Salary Adjustment | GET | `/salary-adjustment/get-salary-adjustments` |
| Salary Adjustment | GET | `/salary-adjustment/get-single-salary-adjustment/:id` |
| Salary Adjustment | PATCH | `/salary-adjustment/update-salary-adjustment/:id` |
| Salary Adjustment | DELETE | `/salary-adjustment/delete-salary-adjustment/:id` |

---

## ব্যবহার নির্দেশিকা

### Admin Dashboard এ প্রবেশ

1. `/login` পেজে যান
2. Admin credentials দিয়ে লগইন করুন
3. Dashboard এ যাবে, যেখানে সাইডবারে সব মডিউল দেখতে পাবেন

### শ্রমিক তৈরি করুন

1. সাইডবার থেকে "শ্রমিক ব্যবস্থাপনা" → "শ্রমিক যোগ করুন" এ যান
2. নাম, ফোন নম্বর এবং দৈনিক বেতন দিন
3. "শ্রমিক তৈরি করুন" বাটনে ক্লিক করুন

### হাজিরা দিন

1. "হাজিরা ব্যবস্থাপনা" → "হাজিরা দিন" এ যান
2. শ্রমিক নির্বাচন করুন
3. তারিখ, উপস্থিতি এবং কাজের সময় দিন
4. "হাজিরা দিন" বাটনে ক্লিক করুন

### সাপ্তাহিক সারাংশ তৈরি

1. "সাপ্তাহিক সারাংশ" → "সারাংশ তৈরি" এ যান
2. শ্রমিক এবং সপ্তাহের তারিখ নির্বাচন করুন
3. "সারাংশ তৈরি করুন" বাটনে ক্লিক করুন

---

## Known Issues

1. **TypeScript Lint Errors**: `@hookform/resolvers` এবং `zod` এর মধ্যে টাইপ inference এ কিছু warning আসতে পারে। এগুলো রানটাইমে কোন সমস্যা করে না।

2. **Build Check**: যদি TypeScript errors আসে, `tsconfig.json` এ `"strict": false` করতে পারেন অথবা build command এ `--skipLibCheck` যোগ করতে পারেন।

---

## Contributing

কোন সমস্যা হলে বা নতুন ফিচার দরকার হলে issue ক্রিয়েট করুন।
