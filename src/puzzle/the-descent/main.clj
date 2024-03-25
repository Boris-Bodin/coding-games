(ns Player
  (:gen-class))
         
(defn -main [& args]
    (while true
           (let [imax (first (apply max-key second (map-indexed vector (repeatedly 8 read))))]
                (println imax))))