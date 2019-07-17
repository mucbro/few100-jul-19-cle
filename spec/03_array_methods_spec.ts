import { isEven } from "../src/utils";
import { data } from "./data";



describe('Array Methods', () => {
    describe('examples', () => {
        let numbers: number[];
        beforeEach(() => {
            numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        });
        it('has a forEach', () => {
            numbers.forEach(f => console.log(f));
        });
        describe('methods that produce a new array', () => {
            it('has a filter', () => {
                const evens = numbers.filter(isEven);
                expect(evens).toEqual([2, 4, 6, 8]);
            });
            it('creating a new array from each element', () => {

                const doubled = numbers.map(num => num * 2);

                expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);

                const stringEvens = numbers
                    .filter(isEven)
                    .map(n => n * 2)
                    .map(n => n.toString());

                expect(stringEvens).toEqual(['4', '8', '12', '16']);
            });

        });
        describe('methods that produce a single (scalar) value', () => {
            it('checking the membership of an array against a predicate', () => {
                const hasSomeEvens = numbers.some(isEven);
                expect(hasSomeEvens).toBe(true);

                const hasAllEvens = numbers.every(isEven);
                expect(hasAllEvens).toBe(false);
            });
            it('reduce', () => {

                const total = numbers.reduce((s, n) => s + n);
                expect(total).toBe(45);

                const totalPlusSome = numbers.reduce((s, n) => s + n, 100);
                expect(totalPlusSome).toBe(145);
            });
            it('finding things', () => {
                // const four = numbers.find() 
                const four = numbers.filter(n => n === 4)[0];
                expect(four).toBe(4);

                const sixteen = numbers.filter(n => n === 16)[0];
                expect(sixteen).toBeUndefined();

                const [five] = numbers.filter(n => n === 5);
                expect(five).toBe(5);
            });
        });
    });
    describe('practical use', () => {
        interface Vehicle {
            vin: string;
            info: {
                make: string;
                model: string;
                year: number;
            };
            mileage: number;
        };
        let vehicles: Vehicle[] = [
            { vin: '8398398397', info: { make: 'Ford', model: 'Explorer', year: 2012 }, mileage: 132_000 },
            { vin: '55567478473', info: { make: 'Toyota', model: 'Camry', year: 2018 }, mileage: 8_000 },
            { vin: '1234947848', info: { make: 'Chevy', model: 'Bolt', year: 2018 }, mileage: 152_000 },
        ];

        it('your practice 1', () => {

            function isAHighMileageVehicle(vehicle: Vehicle) {
                return vehicle.mileage > 100_000;
            }
            function getInfo(vehicle: Vehicle): {
                make: string;
                model: string;
                year: number;
            } {
                return vehicle.info;
            }
            const answer: string[] = vehicles
                .filter(isAHighMileageVehicle) // [vehicles] => [vehicles > 100_000 miles]
                .map(getInfo) // [Vehicles] => [Info]
                .map(peter => `${peter.make} ${peter.model}`); // [Info] => [String]

            expect(answer).toEqual(['Ford Explorer', 'Chevy Bolt']);
        });
        it('second practice with data', () => {
            const customers = data;


            // 1. I want an array of the names, email, phone of each active customer with a balance > $1,000.00
            interface Answer1 {
                name: string;
                email: string;
                phone: string;
            }
            // 2. Also, I want the total balance of all those people, and the number of people.
            interface Answer2 {
                totalBalance: number;
                count: number;
            }
            function convertToCurrency(currency: string): number {
                return Number(currency.replace(/[^0-9\.-]+/g, ""));
            }
            const answer1 = data
                .filter(cust => convertToCurrency(cust.balance) > 1_000 && cust.isActive)
                .map(cust => {
                    return {
                        name: `${cust.name.first} ${cust.name.last}`,
                        email: cust.email,
                        phone: cust.phone
                    } as Answer1
                })

            console.log(answer1);
            //  const answer2:Answer2 = data. // your code here

            const initialState: Answer2 = {
                totalBalance: 0,
                count: 0
            }

            const answer2 = data
                .filter(cust => convertToCurrency(cust.balance) > 1_000 && cust.isActive)
                .map(cust => cust.balance)
                .map(convertToCurrency)
                .reduce((s, n) => ({
                    totalBalance: s.totalBalance + n,
                    count: s.count + 1
                }), initialState);

            console.log(answer2);
            expect(answer2).toEqual({
                totalBalance: 24976.55,
                count: 9
            });

        });
    });
});