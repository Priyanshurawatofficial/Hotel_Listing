#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

class Vehicle {
public:
    string name;
    string type;
    bool isRented;

    Vehicle(string n, string t) : name(n), type(t), isRented(false) {}
};

class VehicleRentalSystem {
private:
    vector<Vehicle> vehicles;
    const int MAX_VEHICLES = 50;

public:
    void addVehicle() {
        if (vehicles.size() >= MAX_VEHICLES) {
            cout << "Cannot add more vehicles. Storage full!" << endl;
            return;
        }

        string name, type;
        cout << "Enter vehicle name: ";
        cin >> name;
        cout << "Enter vehicle type (e.g., Car, Bike): ";
        cin >> type;

        vehicles.emplace_back(name, type);
        cout << "Vehicle added successfully!" << endl;
    }

    void displayVehicles() {
        cout << "\nAvailable Vehicles:\n";
        cout << "---------------------------------------------------\n";
        cout << "ID   Name                  Type            Status\n";
        cout << "---------------------------------------------------\n";
        for (size_t i = 0; i < vehicles.size(); i++) {
            cout << setw(4) << i + 1 << " "
                 << setw(20) << vehicles[i].name << " "
                 << setw(15) << vehicles[i].type << " "
                 << (vehicles[i].isRented ? "Rented" : "Available") << "\n";
        }
        cout << "---------------------------------------------------\n";
    }

    void rentVehicle() {
        int id;
        displayVehicles();
        cout << "Enter the ID of the vehicle to rent: ";
        cin >> id;

        if (id < 1 || id > vehicles.size() || vehicles[id - 1].isRented) {
            cout << "Invalid choice or vehicle already rented!" << endl;
            return;
        }

        vehicles[id - 1].isRented = true;
        cout << "You have rented the vehicle: " << vehicles[id - 1].name << endl;
    }

    void returnVehicle() {
        int id;
        displayVehicles();
        cout << "Enter the ID of the vehicle to return: ";
        cin >> id;

        if (id < 1 || id > vehicles.size() || !vehicles[id - 1].isRented) {
            cout << "Invalid choice or vehicle not currently rented!" << endl;
            return;
        }

        vehicles[id - 1].isRented = false;
        cout << "You have returned the vehicle: " << vehicles[id - 1].name << endl;
    }

    void menu() {
        int choice;
        while (true) {
            cout << "\nVehicle Rental System\n";
            cout << "1. Add Vehicle\n";
            cout << "2. Display Vehicles\n";
            cout << "3. Rent Vehicle\n";
            cout << "4. Return Vehicle\n";
            cout << "5. Exit\n";
            cout << "Enter your choice: ";
            cin >> choice;

            switch (choice) {
                case 1:
                    addVehicle();
                    break;
                case 2:
                    displayVehicles();
                    break;
                case 3:
                    rentVehicle();
                    break;
                case 4:
                    returnVehicle();
                    break;
                case 5:
                    cout << "Exiting... Thank you for using the system!" << endl;
                    return;
                default:
                    cout << "Invalid choice! Please try again." << endl;
            }
        }
    }
};

int main() {
    VehicleRentalSystem system;
    system.menu();
    return 0;
}