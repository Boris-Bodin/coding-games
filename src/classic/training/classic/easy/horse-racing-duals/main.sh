read n
declare -a sorted
min=10000000; last=-1

for((i=0 ; i<n ; i++)); do
    read horse
    sorted[horse]=1
done

if [[ ${#sorted[@]} -ne n ]]; then min=0;
else
    for i in ${!sorted[@]}; do
        if [[ $last -ne -1 && $(($i-$last)) -lt $min ]]; then
            min=$(($i-$last)); fi
        last=$i
    done
fi
echo $min