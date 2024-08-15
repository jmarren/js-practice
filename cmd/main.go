package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Println("progam running")

	jsHandler := func(w http.ResponseWriter, req *http.Request) {
		// fmt.Println("js request")
		//   w.Write()
		w.Header().Set("Content-Type", "application/javascript")
		http.ServeFile(w, req, "./static/js/index.js")
	}

	helloHandler := func(w http.ResponseWriter, req *http.Request) {
		http.ServeFile(w, req, "./static/html/index.html")
	}

	http.HandleFunc("/hello", helloHandler)
	http.HandleFunc("/js", jsHandler)
	log.Fatal(http.ListenAndServe(":7070", nil))
}
