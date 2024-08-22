package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	fmt.Println("progam running")

	currWd, err := os.Getwd()
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("current working dir: ", currWd)
	staticServer := http.FileServer(http.Dir("./static"))

	http.Handle("/static/", http.StripPrefix("/static/", staticServer))
	jsHandler := func(w http.ResponseWriter, req *http.Request) {
		w.Header().Set("Content-Type", "application/javascript")
		http.ServeFile(w, req, "./static/js/index.js")
	}

	prototypesJsHandler := func(w http.ResponseWriter, req *http.Request) {
		w.Header().Set("Content-Type", "application/javascript")
		http.ServeFile(w, req, "./static/js/prototypes.js")
	}

	helloHandler := func(w http.ResponseWriter, req *http.Request) {
		http.ServeFile(w, req, "./static/html/index.html")
	}

	prototypesHTMLHandler := func(w http.ResponseWriter, req *http.Request) {
		http.ServeFile(w, req, "./static/html/prototypes.html")
	}

	// webgameHTMLHanlder := func(w http.ResponseWriter, req *http.Request) {
	// 	http.ServeFile(w, req, "./static/html/webgame.html")
	// }
	//
	// webgameJsHandler := func(w http.ResponseWriter, req *http.Request) {
	// 	w.Header().Set("Content-Type", "application/javascript")
	// 	http.ServeFile(w, req, "./static/js/webgame.js")
	// }

	http.HandleFunc("/index-html", helloHandler)
	http.HandleFunc("/prototypes-html", prototypesHTMLHandler)
	http.HandleFunc("/index-js", jsHandler)
	http.HandleFunc("/prototypes-js", prototypesJsHandler)
	// http.HandleFunc("/webgame-js", webgameJsHandler)
	// http.HandleFunc("/webgame-html", webgameHTMLHanlder)
	log.Fatal(http.ListenAndServe(":7070", nil))
}
