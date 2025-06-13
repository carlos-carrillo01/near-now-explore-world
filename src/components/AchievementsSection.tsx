
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Trophy, MapPin, Camera, Users, Target } from 'lucide-react';

const AchievementsSection = () => {
  const achievements = [
    {
      icon: Star,
      title: 'Descubridor',
      description: 'Has visitado 10 lugares y desbloqueado este rango.',
      progress: '10/10',
      completed: true,
      color: 'text-yellow-600'
    },
    {
      icon: Trophy,
      title: 'Aventurero',
      description: 'Has visitado 25 lugares y desbloqueado este rango.',
      progress: '15/25',
      completed: false,
      color: 'text-blue-600'
    },
    {
      icon: Camera,
      title: 'Coleccionista de Arte',
      description: 'Has escaneado 50 obras de arte diferentes.',
      progress: '32/50',
      completed: false,
      color: 'text-purple-600'
    },
    {
      icon: Users,
      title: 'Embajador Social',
      description: 'Has compartido 20 eventos con la comunidad.',
      progress: '8/20',
      completed: false,
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      title: 'Explorador Local',
      description: 'Has visitado eventos en 5 ciudades diferentes.',
      progress: '3/5',
      completed: false,
      color: 'text-red-600'
    },
    {
      icon: Target,
      title: 'Completista',
      description: 'Has completado todos los desafíos mensuales.',
      progress: '2/3',
      completed: false,
      color: 'text-indigo-600'
    }
  ];

  return (
    <section id="logros" className="container mx-auto px-4 py-16 reveal">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Sistema de Logros
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Desbloquea estampas digitales y sube de nivel cada vez que exploras un lugar o evento.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => {
          const IconComponent = achievement.icon;
          return (
            <Card 
              key={index} 
              className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                achievement.completed ? 'ring-2 ring-yellow-400 bg-yellow-50' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <IconComponent className={`w-12 h-12 ${achievement.color}`} />
                  {achievement.completed && (
                    <Badge className="bg-yellow-500 text-white">
                      ¡Completado!
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {achievement.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className={`font-semibold ${achievement.completed ? 'text-yellow-600' : 'text-primary'}`}>
                      {achievement.progress}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        achievement.completed ? 'bg-yellow-500' : 'bg-primary'
                      }`}
                      style={{
                        width: `${(parseInt(achievement.progress.split('/')[0]) / parseInt(achievement.progress.split('/')[1])) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-8">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
            <h3 className="text-2xl font-bold mb-2">Álbum de Viajes</h3>
            <p className="text-muted-foreground mb-4">
              Colecciona recuerdos digitales de cada lugar que visitas. Tu álbum personal se actualiza automáticamente con fotos, datos y experiencias únicas.
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-2xl text-primary">47</div>
                <div className="text-muted-foreground">Lugares visitados</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-purple-600">128</div>
                <div className="text-muted-foreground">Fotos tomadas</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-green-600">23</div>
                <div className="text-muted-foreground">Eventos asistidos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AchievementsSection;
