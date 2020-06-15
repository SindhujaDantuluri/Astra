import serial
ser = serial.Serial('/dev/ttyACM0')


while(1):
    n=int(input())
    ser.write(n)

