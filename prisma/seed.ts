import { Day, PrismaClient, UserSex, BloodType } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ADMIN
  await prisma.admin.create({
    data: {
      id: "admin1",
      username: "admin1",
    },
  });
  await prisma.admin.create({
    data: {
      id: "admin2",
      username: "admin2",
    },
  });

  // GRADE
  console.log("Creating grades...");
  for (let i = 1; i <= 12; i++) { // Updated to 12 grades
    await prisma.grade.create({
      data: {
        level: i,
      },
    });
  }
  console.log("Grades created successfully.");

  // CLASS
  console.log("Creating classes...");
  for (let i = 1; i <= 12; i++) { // Ensure class mapping matches grade levels
    await prisma.class.create({
      data: {
        name: `${i}A`,
        gradeId: i,
        capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
      },
    });
  }
  console.log("Classes created successfully.");

  // SUBJECT
  const subjectData = [
    { name: "Mathematics" },
    { name: "Science" },
    { name: "English" },
    { name: "History" },
    { name: "Geography" },
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Biology" },
    { name: "Computer Science" },
    { name: "Art" },
  ];

  console.log("Creating subjects...");
  for (const subject of subjectData) {
    await prisma.subject.create({ data: subject });
  }
  console.log("Subjects created successfully.");

  // TEACHER
  console.log("Creating teachers...");
  for (let i = 1; i <= 56; i++) {
    await prisma.teacher.create({
      data: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        name: `TName${i}`,
        surname: `TSurname${i}`,
        email: `teacher${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
        bloodType:
          BloodType[
            Object.keys(BloodType)[
              Math.floor(Math.random() * Object.keys(BloodType).length)
            ] as keyof typeof BloodType
          ],
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        subjects: { connect: [{ id: (i % 10) + 1 }] },
        classes: { connect: [{ id: (i % 12) + 1 }] }, // Match grade levels
        birthday: new Date(
          new Date().setFullYear(new Date().getFullYear() - 30)
        ),
      },
    });
  }
  console.log("Teachers created successfully.");

  // LESSON
  console.log("Creating lessons...");
  for (let i = 1; i <= 30; i++) {
    await prisma.lesson.create({
      data: {
        name: `Lesson${i}`,
        day: Day[
          Object.keys(Day)[
            Math.floor(Math.random() * Object.keys(Day).length)
          ] as keyof typeof Day
        ],
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
        subjectId: (i % 10) + 1,
        classId: (i % 12) + 1, // Match grade levels
        teacherId: `teacher${(i % 15) + 1}`,
      },
    });
  }
  console.log("Lessons created successfully.");

  // PARENT
  console.log("Creating parents...");
  for (let i = 1; i <= 125; i++) {
    await prisma.parent.create({
      data: {
        id: `parentId${i}`,
        username: `parentId${i}`,
        name: `PName ${i}`,
        surname: `PSurname ${i}`,
        email: `parent${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
      },
    });
  }
  console.log("Parents created successfully.");

  // STUDENT
  console.log("Creating students...");
  for (let i = 1; i <= 650; i++) {
    await prisma.student.create({
      data: {
        id: `student${i}`,
        username: `student${i}`,
        name: `SName${i}`,
        surname: `SSurname ${i}`,
        email: `student${i}@example.com`,
        phone: `987-654-321${i}`,
        address: `Address${i}`,
        bloodType:
          BloodType[
            Object.keys(BloodType)[
              Math.floor(Math.random() * Object.keys(BloodType).length)
            ] as keyof typeof BloodType
          ],
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        parentId: `parentId${Math.ceil(i / 2) % 25 || 25}`,
        gradeId: (i % 12) + 1, // Match new grade range
        classId: (i % 12) + 1,
        birthday: new Date(
          new Date().setFullYear(new Date().getFullYear() - 10)
        ),
      },
    });
  }
  console.log("Students created successfully.");

  // EXAM
  console.log("Creating exams...");
  for (let i = 1; i <= 10; i++) {
    await prisma.exam.create({
      data: {
        title: `Exam ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        lessonId: (i % 30) + 1,
      },
    });
  }
  console.log("Exams created successfully.");

  // ASSIGNMENT
  console.log("Creating assignments...");
  for (let i = 1; i <= 20; i++) {
    await prisma.assignment.create({
      data: {
        title: `Assignment ${i}`,
        startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
        dueDate: new Date(new Date().getDate() + 1),
        lessonId: (i % 30) + 1,
      },
    });
  }
  console.log("Assignments created successfully.");

  // RESULT
  console.log("Creating results...");
  for (let i = 1; i <= 20; i++) {
    await prisma.result.create({
      data: {
        score: 90,
        studentId: `student${i}`,
        ...(i <= 5 ? { examId: i } : { assignmentId: i - 5 }),
      },
    });
  }
  console.log("Results created successfully.");

  // ATTENDANCE
  console.log("Creating attendance records...");
  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(),
        present: true,
        studentId: `student${i}`,
        lessonId: (i % 30) + 1,
      },
    });
  }
  console.log("Attendance records created successfully.");

  // EVENT
  console.log("Creating events...");
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`,
        description: `Description for Event ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        classId: (i % 12) + 1, // Match grade levels
      },
    });
  }
  console.log("Events created successfully.");

  // ANNOUNCEMENT
  console.log("Creating announcements...");
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`,
        description: `Description for Announcement ${i}`,
        date: new Date(),
        classId: (i % 12) + 1, // Match grade levels
      },
    });
  }
  console.log("Announcements created successfully.");

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });