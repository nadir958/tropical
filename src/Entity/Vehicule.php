<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\VehiculeRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=VehiculeRepository::class)
 * @ApiResource(
 * normalizationContext={
 *      "groups"={"vehicules_read"}
 * }
 * )
 */
class Vehicule
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"vehicules_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"vehicules_read"})
     */
    private $type;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"vehicules_read"})
     */
    private $nombreplace;

    /**
     * @ORM\Column(type="string", length=65000)
     * @Groups({"vehicules_read"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"vehicules_read"})
     */
    private $photo;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"vehicules_read"})
     */
    private $envedette;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getNombreplace(): ?int
    {
        return $this->nombreplace;
    }

    public function setNombreplace(int $nombreplace): self
    {
        $this->nombreplace = $nombreplace;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getEnvedette(): ?bool
    {
        return $this->envedette;
    }

    public function setEnvedette(bool $envedette): self
    {
        $this->envedette = $envedette;

        return $this;
    }
}
