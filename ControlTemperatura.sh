#!/usr/bin/bash

sensorId='3c01b5562c1b'

temperatura=$(cat /sys/bus/w1/devices/28-$sensorId/w1_slave | grep  -E -o ".{0,0}t=.{0,5}" | cut -c 3-)

echo 'Temperatura: '$temperatura



#salida=$(curl -s http://localhost:3000/temp)



#temperatura=${salida##*:}
#temperatura=${temperatura%*\}}
#temperatura=${temperatura%%.*}

#echo $temperatura

if [ $temperatura -lt 24600 ]
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