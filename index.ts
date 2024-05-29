#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Doctor {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
}

class Hospital {
    doctors: Doctor[] = [];

    addDoctor(obj: Doctor) {
        this.doctors.push(obj);
    }
}

const hospital = new Hospital();

const programStart = async (hospital: Hospital) => {
    console.log(chalk.green("WELCOME TO THE HOSPITAL MANAGEMENT SYSTEM"));

    while (true) {
        const answer = await inquirer.prompt({
            type: "list",
            name: "select",
            message: "Who would you like to talk to?",
            choices: ["Hospital Staff", "Doctor", "Exit"],
        });

        if (answer.select === "Hospital Staff") {
            const staffMessage = await inquirer.prompt({
                type: "input",
                name: "message",
                message: "Please enter your message for the hospital staff:",
            });

            console.log(chalk.yellow(`OK! Your message "${staffMessage.message}" will be delivered to the hospital staff.`));
        }

        if (answer.select === "Doctor") {
            const doctorAnswer = await inquirer.prompt({
                type: "input",
                message: "Which doctor do you want to talk to?",
                name: "doctor",
            });

            const doctor = hospital.doctors.find(val => val.name === doctorAnswer.doctor);
            if (!doctor) {
                const name = new Doctor(doctorAnswer.doctor);
                hospital.addDoctor(name);

                console.log(chalk.blue(`Hello, I'm Dr. ${name.name}.`));
                console.log(chalk.blue("Current list of doctors:"));
                hospital.doctors.forEach((doctor, index) => {
                    console.log(chalk.blue(`${index + 1}. Dr. ${doctor.name}`));
                });
            } else {
                console.log(chalk.blue(`Hello, I'm Dr. ${doctor.name}.`));
                console.log(chalk.blue("Current list of doctors:"));
                hospital.doctors.forEach((doctor, index) => {
                    console.log(chalk.blue(`${index + 1}. Dr. ${doctor.name}`));
                });
            }
        }

        if (answer.select === "Exit") {
            console.log(chalk.red("Exiting the system. Goodbye!"));
            break;
        }
    }
};

programStart(hospital);
