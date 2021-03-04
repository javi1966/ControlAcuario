#!/usr/bin/bash

temperatura=0

salida=$(curl -s http://localhost:3000/temp)

echo $salida

temperatura=${salida##*:}
temperatura=${temperatura%*\}}
temperatura=${temperatura%%.*}

echo $temperatura

if [ $temperatura -lt 25 ]
then

  echo "Acciono Calentador"
  curl -s http://localhost:3000/calentadoron 2>&1 > /dev/null 
  curl -s http://localhost:3000/bombaon 2>&1 > /dev/null 

else

   echo "Quito Calentador"
   curl -s http://localhost:3000/calentadoroff 2>&1 > /dev/null 
   curl -s http://localhost:3000/bombaoff 2>&1 > /dev/null  
fi

exit 0