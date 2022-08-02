package main

import (
    "log"
    "os"
)

func main() {
// Need to remove all zip files to build as fast as possible
    err := os.RemoveAll("../src")
    if err != nil {
        log.Fatal(err)
    }
}