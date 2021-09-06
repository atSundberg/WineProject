package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strconv"
	"strings"
)

type WineInfo struct {
	Type     string
	Year     int32
	Producer string
	Brand    string
	Grapes   []string
	Region   string
}

func buildRecord(fields []string) WineInfo {
	year, _ := strconv.Atoi(fields[1])
	return WineInfo{
		Type:     fields[0],
		Year:     int32(year),
		Producer: fields[2],
		Brand:    fields[3],
		Grapes:   strings.Split(fields[4], ","),
		Region:   fields[5],
	}
}
func readFile(fileName string) string {
	file, err := os.Open(fileName)
	if err != nil {
		log.Fatal(err)
		return ""
	}
	defer file.Close()

	data, err := ioutil.ReadAll(file)
	return string(data)
}

func writeFile(fileName string, data string) {
	fp, err := os.Create(fileName)
	if err != nil {
		log.Fatal(err)
	}
	defer fp.Close()

	_, err2 := fp.WriteString(data)
	if err2 != nil {
		log.Fatal(err2)
	}
}

func sortFile(sortBy string) {
	
	switch sortBy {
	case "Producer":
		//Sortera på producent
	case "Region":
		//Sortera på region
	case "Year":
		//Sortera på year
	default:
		//Sortera på typ
	}
}


func main() {
	data := readFile("./WineList.txt")
	fmt.Println(data)
	var rows = strings.Split(data, "\n")
	lst := []WineInfo{}
	for _, r := range rows {
		row := strings.TrimSpace(r)
		if len(row) > 0 {

			var fields = strings.Split(row, ";")
			wi := buildRecord(fields)
			lst = append(lst, wi)
		}
	}
	jsonData, _ := json.Marshal(lst)
	fmt.Println(":>", string(jsonData))
	writeFile("./static/WineList.json", string(jsonData))
}
