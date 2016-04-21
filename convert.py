import csv
import sys
import json
import requests

fieldnames=["id","postal_code","revenue","lat","lng"]

def convert():
    csv_filename = "data.csv"
    print ("Opening CSV file: ", csv_filename)
    f = open(csv_filename, 'r')

    csv_reader = csv.DictReader(f,fieldnames)
    json_filename = csv_filename.split(".")[0]+".js"   # customers.js

    print ("Saving JSON to file: ", json_filename)
    jsonf = open(json_filename,'w')

    jsonf.write("var customers = [")

    for record in csv_reader:
        url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBL_3_jVj683n24Fm9zQZxnj9HjdrNCSSg&address={}+Netherlands".format(record["postal_code"])
        response = requests.get(url)
        parsed = response.json()

        jsonf.write("{")
        jsonf.write("postal_code:\"{}\",".format(record["postal_code"]))
        jsonf.write("revenue:{},".format(record["revenue"]))

        jsonf.write("lat:{},".format(parsed["results"][1]["geometry"]["location"]["lat"]))
        jsonf.write("lng:{}".format(parsed["results"][1]["geometry"]["location"]["lng"]))
        jsonf.write("},")

    jsonf.write("];")

    f.close()
    jsonf.close()

if __name__=="__main__":
    convert()
