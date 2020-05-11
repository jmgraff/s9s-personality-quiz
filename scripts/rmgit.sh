cd $1
for dir in *
do
    echo "$dir"
    rm -rf $dir/.git*
done

